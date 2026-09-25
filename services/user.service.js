const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const TokenBlacklist = require('../models/TokenBlacklist.model');

const generarToken = (usuario) => {
    return jwt.sign({ 
        id: usuario._id,
        correo: usuario.correo 
    },
        process.env.JWT_SECRET,
        { 
            // Expira en 24 horas
            expiresIn: 86400 
        });
};

exports.registrarAdmin = async function (data) {
    try {
        const { nombre, apellido, correo, telefono, password } = data;
        const correoNormalizado = correo.toLowerCase().trim();

        const existeAdmin = await User.findOne({ correo: correoNormalizado });
        if (existeAdmin) {
            throw new Error('Ya existe un administrador con ese correo electrónico.');
        }

        const contraseniaHasheada = await bcrypt.hash(password, 10);

        const nuevoAdmin = new User({
            nombre,
            apellido,
            correo: correoNormalizado,
            telefono,
            password: contraseniaHasheada
        });

        const adminGuardado = await nuevoAdmin.save();

        const usuario = adminGuardado.toObject();
        delete usuario.password;

        const token = generarToken(usuario);

        return { usuario, token };
    } catch (e) {
        if (e.code === 11000) {
            throw new Error('Ya existe un administrador con ese correo electrónico.');
        }
        console.error('Error en el servicio de User:', e);
        throw new Error('Error al registrar el administrador en la base de datos');
    }
};

exports.loginAdmin = async function (correo, password) {
    try {
        const correoNormalizado = correo.toLowerCase().trim();

        const admin = await User.findOne({ correo: correoNormalizado }).select('+password');
        if (!admin) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        const passwordValida = await bcrypt.compare(password, admin.password);
        if (!passwordValida) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        const usuario = admin.toObject();
        delete usuario.password;

        const token = generarToken(usuario);

        return { usuario, token };
    } catch (e) {
        if (e.message === 'Correo o contraseña incorrectos.') {
            throw e;
        }
        console.error('Error en el servicio de User:', e);
        throw new Error('Error al iniciar sesión del administrador');
    }
};

exports.cerrarSesion = async function (token, decoded) {
    try {
        const expiracion = new Date(decoded.exp * 1000);

        // Upsert para que revocar el mismo token varias veces no falle
        await TokenBlacklist.findOneAndUpdate(
            { token },
            { $setOnInsert: { token, expiresAt: expiracion } },
            { upsert: true }
        );

        return true;
    } catch (e) {
        console.error('Error en el servicio de User al cerrar sesión:', e);
        throw new Error('Error al cerrar la sesión del administrador');
    }
};

exports.solicitarRecuperacionPassword = async function (correo) {
    try {
        const correoNormalizado = correo.toLowerCase().trim();
        const admin = await User.findOne({ correo: correoNormalizado })
            .select('+resetPasswordToken +resetPasswordExpires');

        // Respuesta genérica: no revelamos si el correo existe o no
        if (!admin) {
            return;
        }

        const tokenRecuperacion = crypto.randomBytes(4).toString('hex');
        const minutosExpiracion = parseInt(process.env.RESET_TOKEN_EXPIRATION_MIN, 10) || 15;

        admin.resetPasswordToken = tokenRecuperacion;
        admin.resetPasswordExpires = new Date(Date.now() + minutosExpiracion * 60 * 1000);
        await admin.save();

        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
        const linkRecuperacion = `${tokenRecuperacion}`;

        // Por ahora el "envío" se loguea en consola. Reemplazar por SMTP cuando se requiera.
        console.log(`==========================================`);
        console.log(`[RECUPERACIÓN DE CONTRASEÑA] \nPara: ${admin.correo}`);
        console.log(`Enlace de recuperación (válido por ${minutosExpiracion} minutos):`);
        console.log("Token:", linkRecuperacion);
        console.log(`==========================================`);

        return;
    } catch (e) {
        console.error('Error en el servicio de User al solicitar recuperación:', e);
        throw new Error('Error al solicitar la recuperación de contraseña');
    }
};

exports.restablecerPassword = async function (token, nuevaPassword) {
    try {
        if (!nuevaPassword || nuevaPassword.length < 6) {
            throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
        }

        const admin = await User.findOne({ resetPasswordToken: token })
            .select('+password +resetPasswordToken +resetPasswordExpires');

        if (!admin || !admin.resetPasswordExpires || admin.resetPasswordExpires < new Date()) {
            throw new Error('Enlace de recuperación inválido o expirado.');
        }

        const contraseniaHasheada = await bcrypt.hash(nuevaPassword, 10);

        admin.password = contraseniaHasheada;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;
        await admin.save();

        return true;
    } catch (e) {
        if (e.message === 'La nueva contraseña debe tener al menos 6 caracteres.' ||
            e.message === 'Enlace de recuperación inválido o expirado.') {
            throw e;
        }
        console.error('Error en el servicio de User al restablecer contraseña:', e);
        throw new Error('Error al restablecer la contraseña');
    }
};

exports.modificarAdmin = async function (id, datosActualizados) {
    try {
        if (!datosActualizados || Object.keys(datosActualizados).length === 0) {
            throw new Error('No se enviaron datos para actualizar');
        }

        // Se filtran los campos permitidos
        const { nombre, apellido, correo, telefono } = datosActualizados;
        const actualizacion = {};

        if (nombre !== undefined) actualizacion.nombre = nombre;
        if (apellido !== undefined) actualizacion.apellido = apellido;
        if (telefono !== undefined) actualizacion.telefono = telefono;

        if (correo !== undefined) {
            if (typeof correo !== 'string' || !correo.trim()) {
                throw new Error('El correo electrónico debe ser una cadena de texto válida.');
            }

            const correoNormalizado = correo.toLowerCase().trim();

            const existeCorreo = await User.findOne({ 
                correo: correoNormalizado, 
                _id: { $ne: id } 
            });

            if (existeCorreo) {
                throw new Error('El correo electrónico ya está en uso por otro administrador.');
            }

            actualizacion.correo = correoNormalizado;
        }

        if (Object.keys(actualizacion).length === 0) {
            throw new Error('No se enviaron campos válidos para actualizar');
        }

        // Actualizamos con $set y devolvemos el usuario sin la contraseña
        const adminModificado = await User.findByIdAndUpdate(
            id,
            { $set: actualizacion },
            { new: true, runValidators: true }
        ).select('-password');

        if (!adminModificado) {
            throw new Error('No se encontró el administrador con ese ID');
        }

        return adminModificado;
    } catch (e) {
        if (e.code === 11000) {
            throw new Error('El correo electrónico ya está en uso por otro administrador.');
        }
        console.error('Error en el servicio de User al modificar:', e);
        throw e;
    }
};