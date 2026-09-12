const ConsultaService = require('../services/consulta.service');

exports.crearConsulta = async function (req, res) {
    const { nombre, correo, telefono, asunto, mensaje } = req.body;

    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre, correo, asunto y mensaje."
        });
    }

    try {
        const consultaCreada = await ConsultaService.crearConsulta(req.body);

        console.log(`¡Éxito! Se guardó la consulta de: ${consultaCreada.correo}`);

        return res.status(201).json({
            status: 201,
            data: consultaCreada,
            message: "Consulta enviada exitosamente"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};