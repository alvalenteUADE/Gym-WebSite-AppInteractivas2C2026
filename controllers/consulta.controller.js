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

exports.modificarEstado = async function (req, res) {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({
            status: 400,
            message: "Falta el campo 'estado' en el cuerpo de la petición."
        });
    }

    try {
        const resultado = await ConsultaService.modificarEstado(id, estado);
        
        return res.status(200).json({
            status: 200,
            data: resultado,
            message: "Estado de la consulta actualizado exitosamente."
        });
    } catch (e) {
        if (e.message === 'No se encontró la consulta con ese ID.') {
            return res.status(404).json({
                status: 404,
                message: e.message
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.eliminarConsulta = async function (req, res) {
    const { id } = req.params;

    try {
        await ConsultaService.eliminarConsulta(id);
        
        return res.status(200).json({
            status: 200,
            message: "Consulta eliminada exitosamente."
        });
    } catch (e) {
        if (e.message === 'No se encontró la consulta con ese ID.') {
            return res.status(404).json({
                status: 404,
                message: e.message
            });
        }
        
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};