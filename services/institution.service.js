const Institution = require('../models/Institution.model');

exports.crearInstitucion = async function (data) {
    try {
        const nuevaInstitucion = new Institution(data);
        const institucionGuardada = await nuevaInstitucion.save();
        return institucionGuardada;
    } catch (e) {
        console.error('Error en el servicio de Institution:', e);
        throw new Error('Error al guardar la información institucional en la base de datos');
    }
};

exports.modificarInstitucion = async function (id, datosActualizados) {
    try {
        if (!datosActualizados || Object.keys(datosActualizados).length === 0) {
            throw new Error('No se enviaron datos para actualizar');
        }

        // Filtrar exclusivamente los campos permitidos para prevenir inyecciones de operadores de MongoDB
        const { nombre, direccion, telefono, horarios_atencion, redes_sociales } = datosActualizados;

        const actualizacion = {};
        if (nombre !== undefined) actualizacion.nombre = nombre;
        if (direccion !== undefined) actualizacion.direccion = direccion;
        if (telefono !== undefined) actualizacion.telefono = telefono;
        if (horarios_atencion !== undefined) actualizacion.horarios_atencion = horarios_atencion;
        if (redes_sociales !== undefined) actualizacion.redes_sociales = redes_sociales;

        if (Object.keys(actualizacion).length === 0) {
            throw new Error('No se enviaron campos válidos para actualizar');
        }

        // Se busca por ID y se actualiza usando $set explícito
        const institucionModificada = await Institution.findByIdAndUpdate(
            id,
            { $set: actualizacion },
            { new: true, runValidators: true }
        );

        if (!institucionModificada) {
            throw new Error('No se encontró la institución con ese ID');
        }

        return institucionModificada;
    } catch (e) {
        console.error('Error en el servicio de Institution al modificar:', e);
        throw new Error(e.message || 'Error al modificar la información institucional en la base de datos');
    }
};