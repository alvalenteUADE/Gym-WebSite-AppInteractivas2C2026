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