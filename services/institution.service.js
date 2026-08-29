const Institution = require('../models/Institution.model');

exports.crearInstitucion = async function (data) {
    try {
        const nuevaInstitucion = new Institution(data);
        const institucionGuardada = await nuevaInstitucion.save();
        return institucionGuardada;
    } catch (e) {
        console.log("Error en el servicio de Institution:", e);
        throw Error('Error al guardar la información institucional en la base de datos');
    }
}