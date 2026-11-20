// ============================================================
// SCRIPT DE INICIALIZACIÓN DE LA BASE DE DATOS
// ------------------------------------------------------------
// 1. Limpia las colecciones (directo por Mongoose, ver limpiar.js).
// 2. Inserta los usuarios directamente en la BD asignando roles,
//    y genera directamente el token de administrador para los pasos siguientes.
// 3. Carga los datos de prueba consumiendo los endpoints de la API.
//
// Uso:
//   1. Levantar el servidor:   npm run dev
//   2. En otra terminal:       npm run seed
//
// ATENCIÓN: borra los datos existentes en cada corrida.
// ============================================================

require('dotenv').config();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const api = require('./api');
const limpiarBaseDeDatos = require('./limpiar');
const User = require('../../models/User.model'); // Importamos el modelo de Mongoose para inserción directa
const usuarios = require('./data/usuarios');
const institucion = require('./data/institucion');
const categorias = require('./data/categorias');
const publicaciones = require('./data/publicaciones');

// URI de conexión a MongoDB leída exclusivamente desde el archivo .env
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DB_URI;

if (!MONGO_URI) {
    console.error('\n[ERROR] No se encontró la variable de entorno MONGODB_URI (ni MONGO_URI / DB_URI) en el archivo .env\n');
    process.exit(1);
}

// ---------- Helpers de log ----------
const log = {
    titulo: (msg) => console.log(`\n=== ${msg} ===`),
    ok: (msg) => console.log(`   [OK]     ${msg}`),
    error: (msg) => console.log(`   [ERROR] ${msg}`)
};

// ============================================================
// PASO 0: verificar que la API esté corriendo
// ============================================================
async function verificarApi() {
    log.titulo(`Verificando API en ${api.BASE_URL}`);
    const { status } = await api.get('/');
    if (status !== 200) {
        throw new Error(`La API respondió con status ${status}`);
    }
    log.ok('API disponible');
}

// ============================================================
// PASO 1: limpiar la base de datos
// ============================================================
async function limpiar() {
    log.titulo('Limpiando base de datos');
    await limpiarBaseDeDatos(log);
}

// ============================================================
// PASO 2: usuarios administradores y de prueba
// Crea los usuarios directo en BD con su rol y genera el token.
// ============================================================
async function cargarUsuarios() {
    log.titulo(`Usuarios de prueba (${usuarios.length})`);
    let token = null;

    // Nos aseguramos de reconectar Mongoose por si limpiar.js cerró la conexión
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(MONGO_URI);
    }

    let creados = 0;
    let existentes = 0;

    for (let i = 0; i < usuarios.length; i++) {
        const datosUsuario = usuarios[i];
        const rolAsignado = datosUsuario.rol || (i === 0 ? 'admin' : 'cliente');

        try {
            // Los usuarios no se borran entre corridas: si ya está, se deja como está
            const yaExiste = await User.findOne({ correo: datosUsuario.correo.toLowerCase().trim() });

            if (yaExiste) {
                existentes += 1;
                log.ok(`Ya existía (${yaExiste.rol}): ${datosUsuario.correo}`);
                continue;
            }

            const nuevoUsuario = new User({
                ...datosUsuario,
                rol: rolAsignado
            });

            await nuevoUsuario.save(); // Dispara el hash de contraseña del modelo
            creados += 1;
            log.ok(`Creado en DB (${rolAsignado}): ${datosUsuario.correo}`);
        } catch (error) {
            // El índice único puede saltar si dos corridas coinciden en el tiempo
            if (error.code === 11000) {
                existentes += 1;
                log.ok(`Ya existía: ${datosUsuario.correo}`);
            } else {
                log.error(`${datosUsuario.correo}: ${error.message}`);
            }
        }
    }

    const totalClientes = await User.countDocuments({ rol: 'cliente' });
    const totalAdmins = await User.countDocuments({ rol: 'admin' });
    log.ok(`Resumen: ${creados} creado(s), ${existentes} ya existente(s) · en la base hay ${totalAdmins} admin(s) y ${totalClientes} cliente(s)`);

    // Generamos el token de administrador directamente usando el ID real de la base de datos
    try {
        const correoAdmin = (usuarios.find((u) => u.rol === 'admin') || usuarios[0]).correo;
        const adminUser = await User.findOne({ correo: correoAdmin.toLowerCase().trim(), rol: 'admin' });
        
        if (!adminUser) {
            throw new Error('No se encontró al usuario administrador en la base de datos.');
        }

        const secretKey = process.env.JWT_SECRET || process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error('No se encontró JWT_SECRET (ni SECRET_KEY) en el archivo .env');
        }

        token = jwt.sign(
            { id: adminUser._id, rol: adminUser.rol, correo: adminUser.correo },
            secretKey,
            { expiresIn: '1h' }
        );

        if (token) {
            log.ok('Token de administrador generado exitosamente para el seed.');
        }
    } catch (e) {
        throw new Error('No se pudo generar el token de admin: ' + e.message);
    }

    if (!token) {
        throw new Error('No se pudo obtener un token de administrador válido. Revisar data/usuarios.js');
    }

    return token;
}

// ============================================================
// PASO 3: información institucional
// ============================================================
async function cargarInstitucion(token) {
    log.titulo('Información institucional');

    const respuesta = await api.post('/api/institution/create', institucion, { token });

    if (respuesta.status === 201) {
        log.ok(`Creada: ${institucion.nombre}`);
    } else {
        log.error(`${institucion.nombre}: ${respuesta.body?.message || respuesta.status}`);
    }
}

// ============================================================
// PASO 4: categorías
// ============================================================
async function cargarCategorias(token) {
    log.titulo(`Categorías (${categorias.length})`);
    const mapa = {};

    for (const categoria of categorias) {
        const respuesta = await api.post('/api/category/create', categoria, { token });

        if (respuesta.status === 201) {
            log.ok(`Creada: ${categoria.nombre}`);
            mapa[categoria.nombre] = respuesta.body.data._id;
        } else {
            log.error(`${categoria.nombre}: ${respuesta.body?.message || respuesta.status}`);
        }
    }

    return mapa;
}

// ============================================================
// PASO 5: publicaciones (productos y servicios)
// ============================================================
async function cargarPublicaciones(token, categoriasPorNombre) {
    log.titulo(`Publicaciones (${publicaciones.length})`);

    for (const publicacion of publicaciones) {
        const categoriaId = categoriasPorNombre[publicacion.categoria];
        if (!categoriaId) {
            log.error(`${publicacion.nombre}: la categoría "${publicacion.categoria}" no existe en data/categorias.js`);
            continue;
        }

        const respuesta = await api.post(
            '/api/publicacion/create',
            { ...publicacion, categoria: categoriaId },
            { token }
        );

        if (respuesta.status === 201) {
            log.ok(`Creada: ${publicacion.nombre} (${publicacion.categoria})`);
        } else {
            log.error(`${publicacion.nombre}: ${respuesta.body?.message || respuesta.status}`);
        }
    }
}

// ============================================================
// EJECUCIÓN
// ============================================================
(async () => {
    try {
        await verificarApi();
        await limpiar();
        const token = await cargarUsuarios();
        await cargarInstitucion(token);
        const categoriasPorNombre = await cargarCategorias(token);
        await cargarPublicaciones(token, categoriasPorNombre);

        console.log('\nSeed finalizado con éxito.\n');
        
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        process.exit(0);
    } catch (e) {
        console.error(`\nSeed abortado: ${e.message}\n`);
        try {
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
            }
        } catch {}
        process.exit(1);
    }
})();