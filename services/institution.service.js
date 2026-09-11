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
}

exports.modificarInstitucion = async function (id, datosActualizados) {
    try {
        // Validamos que al menos tenga un dato para actualizar
        if (!datosActualizados || Object.keys(datosActualizados).length === 0) {
            throw new Error('No se enviaron datos para actualizar');
        }

        // Se busca por ID y se actualiza
        // { new: true } devuelve el objeto actualizado
        // { runValidators: true } aplica las validaciones del esquema
        const institucionModificada = await Institution.findByIdAndUpdate(
            id, 
            datosActualizados, 
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
}