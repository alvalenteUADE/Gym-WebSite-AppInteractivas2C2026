const Consulta = require('../models/Consulta.model');

exports.crearConsulta = async function (data) {
    try {
        const { nombre, correo, telefono, asunto, mensaje } = data;
        const correoNormalizado = correo.toLowerCase().trim();

        const nuevaConsulta = new Consulta({
            nombre,
            correo: correoNormalizado,
            telefono,
            asunto,
            mensaje
        });

        const consultaGuardada = await nuevaConsulta.save();
        return consultaGuardada;
    } catch (e) {
        console.error('Error en el servicio de Consulta:', e);
        throw new Error('Error al guardar la consulta en la base de datos');
    }
};