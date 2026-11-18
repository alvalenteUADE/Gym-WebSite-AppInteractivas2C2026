// ============================================================
// SCRIPT DE INICIALIZACIÓN DE LA BASE DE DATOS
// ------------------------------------------------------------
// 1. Limpia las colecciones (directo por Mongoose, ver limpiar.js).
// 2. Carga datos de prueba consumiendo los endpoints de la API,
//    así se validan las mismas reglas que en producción.
//
// Uso:
//   1. Levantar el servidor:  npm run dev
//   2. En otra terminal:      npm run seed
//
// ATENCIÓN: borra los datos existentes en cada corrida.
//
// Para agregar datos de prueba editar los archivos en ./data:
//   data/usuarios.js       -> administradores
//   data/institucion.js    -> información del comercio
//   data/categorias.js     -> categorías
//   data/publicaciones.js  -> productos y servicios
// ============================================================

require('dotenv').config();

const api = require('./api');
const limpiarBaseDeDatos = require('./limpiar');
const usuarios = require('./data/usuarios');
const institucion = require('./data/institucion');
const categorias = require('./data/categorias');
const publicaciones = require('./data/publicaciones');
const consultas = require('./data/consultas');

// ---------- Helpers de log ----------
const log = {
    titulo: (msg) => console.log(`\n=== ${msg} ===`),
    ok: (msg) => console.log(`  [OK]    ${msg}`),
    error: (msg) => console.log(`  [ERROR] ${msg}`)
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
// PASO 2: usuarios administradores
// Devuelve el token del primer usuario para los pasos siguientes.
// ============================================================
async function cargarUsuarios() {
    log.titulo(`Usuarios administradores (${usuarios.length})`);
    let token = null;

    for (const usuario of usuarios) {
        const registro = await api.post('/api/user/register', usuario);

        if (registro.status === 201) {
            log.ok(`Registrado: ${usuario.correo}`);
            if (!token) token = registro.body.data.token;
            continue;
        }

        const login = await api.post('/api/user/login', {
            correo: usuario.correo,
            password: usuario.password
        });

        if (login.status === 200) {
            log.ok(`Ya existía: ${usuario.correo}`);
            if (!token) token = login.body.data.token;
        } else {
            log.error(`${usuario.correo}: ${registro.body?.message || registro.status}`);
        }
    }

    if (!token) {
        throw new Error('No se pudo registrar ni autenticar ningún administrador. Revisar data/usuarios.js');
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
// Devuelve un mapa { nombre -> _id } para asociar publicaciones.
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
// PASO 6: consultas del formulario de contacto
// Se crean por el endpoint público y después se les ajusta el
// estado, que no se puede fijar en el alta.
// ============================================================
async function cargarConsultas(token) {
    log.titulo(`Consultas (${consultas.length})`);

    for (const consulta of consultas) {
        const { estado, ...datos } = consulta;

        const respuesta = await api.post('/api/consulta/create', datos);

        if (respuesta.status !== 201) {
            log.error(`${datos.asunto}: ${respuesta.body?.message || respuesta.status}`);
            continue;
        }

        if (!estado || estado === 'Pendiente') {
            log.ok(`Creada: ${datos.asunto} (Pendiente)`);
            continue;
        }

        const id = respuesta.body.data._id;
        const cambio = await api.put(`/api/consulta/${id}/estado`, { estado }, { token });

        if (cambio.status === 200) {
            log.ok(`Creada: ${datos.asunto} (${estado})`);
        } else {
            log.error(`${datos.asunto}: no se pudo marcar como ${estado} (${cambio.body?.message || cambio.status})`);
        }
    }
}

// ============================================================
// EJECUCIÓN
// Para agregar un paso nuevo (ej: institución, consultas),
// crear su función arriba y sumarla acá en el orden correcto.
// ============================================================
(async () => {
    try {
        await verificarApi();
        await limpiar();
        const token = await cargarUsuarios();
        await cargarInstitucion(token);
        const categoriasPorNombre = await cargarCategorias(token);
        await cargarPublicaciones(token, categoriasPorNombre);
        await cargarConsultas(token);

        console.log('\nSeed finalizado.\n');
        process.exit(0);
    } catch (e) {
        console.error(`\nSeed abortado: ${e.message}\n`);
        process.exit(1);
    }
})();
