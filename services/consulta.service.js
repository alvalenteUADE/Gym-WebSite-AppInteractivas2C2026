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
        console.error('Error en el servicio de Consulta al crear:', e);
        throw new Error('Error al guardar la consulta en la base de datos');
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