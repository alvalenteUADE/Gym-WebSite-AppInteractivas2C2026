const UserService = require('../services/user.service');

exports.registrarAdmin = async function (req, res) {
    const { nombre, apellido, correo, telefono, password } = req.body;

    if (!nombre || !apellido || !correo || !telefono || !password) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre, apellido, correo, telefono y password."
        });
    }

    try {
        const resultado = await UserService.registrarAdmin(req.body);

        console.log(`¡Éxito! Se registró el administrador: ${resultado.usuario.correo}`);

        return res.status(201).json({
            status: 201,
            data: resultado,
            message: "Administrador registrado exitosamente"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.loginAdmin = async function (req, res) {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar correo y password."
        });
    }

    try {
        const resultado = await UserService.loginAdmin(correo, password);

        return res.status(200).json({
            status: 200,
            data: resultado,
            message: "Inicio de sesión exitoso"
        });
    } catch (e) {
        const esCredencialInvalida = e.message === 'Correo o contraseña incorrectos.';

        return res.status(esCredencialInvalida ? 401 : 400).json({
            status: esCredencialInvalida ? 401 : 400,
            message: e.message
        });
    }
}

exports.cerrarSesionAdmin = async function (req, res) {
    try {
        await UserService.cerrarSesion(req.token, req.usuario);

        return res.status(200).json({
            status: 200,
            message: "Sesión cerrada exitosamente"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.solicitarRecuperacionPassword = async function (req, res) {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar correo."
        });
    }

    try {
        await UserService.solicitarRecuperacionPassword(correo);

        return res.status(200).json({
            status: 200,
            message: "Si el correo está registrado, se enviará un enlace de recuperación."
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.restablecerPassword = async function (req, res) {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar token y password."
        });
    }

    try {
        await UserService.restablecerPassword(token, password);

        return res.status(200).json({
            status: 200,
            message: "Contraseña restablecida exitosamente"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}