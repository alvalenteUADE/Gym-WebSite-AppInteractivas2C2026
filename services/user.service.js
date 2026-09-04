const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

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
}

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
}