const InstitutionService = require('../services/institution.service');

exports.crearInstitucion = async function (req, res) {
    const { nombre, descripcion, direccion, telefono, redes_sociales, horarios_atencion } = req.body;
    //validación de campos requeridos
    if (!nombre || !direccion || !telefono || !horarios_atencion) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre, direccion, telefono y horarios_atencion."
        });
    }

    try {
        const institucionCreada = await InstitutionService.crearInstitucion(req.body);
        
        console.log(`¡Éxito! Se guardaron los datos del comercio: ${institucionCreada.nombre}`);

        return res.status(201).json({
            status: 201,
            data: institucionCreada,
            message: "Información institucional creada exitosamente"
        });
    } catch (e) {
        return res.status(400).json({ 
            status: 400, 
            message: e.message 
        });
    }
}

exports.modificarInstitucion = async function (req, res) {
    try {
        // Sacamos el ID de los parámetros de la URL
        const { id } = req.params;
        const datosAActualizar = req.body;

        const institucionModificada = await InstitutionService.modificarInstitucion(id, datosAActualizar);

        console.log(`¡Éxito! Se modificaron los datos de la institución: ${institucionModificada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: institucionModificada,
            message: "Información institucional modificada exitosamente"
        });
    } catch (e) {
        return res.status(400).json({ 
            status: 400, 
            message: e.message 
        });
    }
}