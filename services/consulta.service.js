const mongoose = require('mongoose');
const Consulta = require('../models/Consulta.model');
const EmailService = require('./email.service');

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

        // El envío del correo no debe bloquear el guardado: si falla se loguea
        // el error y la consulta igual queda registrada en la base de datos.
        try {
            await EmailService.enviarCorreoConsulta(consultaGuardada);
        } catch (errorCorreo) {
            console.error('Error al enviar el correo de la consulta:', errorCorreo);
        }

        return consultaGuardada;
    } catch (e) {
        console.error('Error en el servicio de Consulta al crear:', e);
        throw new Error('Error al guardar la consulta en la base de datos');
    }
};

exports.listarConsultas = async function () {
    try {
        return await Consulta.find().sort({ createdAt: -1 });
    } catch (e) {
        console.error('Error en el servicio de Consulta al listar:', e);
        throw new Error('Error al obtener las consultas de la base de datos');
    }
};

exports.modificarEstado = async function (id, nuevoEstado) {
    // Obtenemos los estados válidos directamente del esquema de Mongoose
    const estadosValidos = Consulta.schema.path('estado').enumValues;
    
    if (!estadosValidos.includes(nuevoEstado)) {
        throw new Error(`Estado inválido. Los estados permitidos son: ${estadosValidos.join(', ')}.`);
    }

    try {
        const consultaActualizada = await Consulta.findByIdAndUpdate(
            id,
            { estado: nuevoEstado },
            { new: true, runValidators: true }
        );

        if (!consultaActualizada) {
            throw new Error('No se encontró la consulta con ese ID.');
        }

        return consultaActualizada;
    } catch (e) {
        // Si el error ya lo lanzamos nosotros, lo dejamos pasar
        if (e.message === 'No se encontró la consulta con ese ID.') {
            throw e;
        }
        console.error('Error en el servicio de Consulta al modificar estado:', e);
        throw new Error('Error al modificar el estado de la consulta');
    }
};

exports.eliminarConsulta = async function (id) {
    // Validar que el ID tenga formato válido de MongoDB para evitar CastError
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('No se encontró la consulta con ese ID.');
    }

    try {
        const consultaEliminada = await Consulta.findByIdAndDelete(id);

        if (!consultaEliminada) {
            throw new Error('No se encontró la consulta con ese ID.');
        }

        return consultaEliminada;
    } catch (e) {
        if (e.message === 'No se encontró la consulta con ese ID.') {
            throw e;
        }
        console.error('Error en el servicio de Consulta al eliminar:', e);
        throw new Error('Error al eliminar la consulta');
    }
};
