const PublicacionService = require('../services/publicacion.service');

// Traduce los mensajes de error del servicio al código HTTP correspondiente
const responderError = (res, e) => {
    if (e.message === 'No se encontró la publicación con ese ID' ||
        e.message === 'No se encontró la categoría indicada') {
        return res.status(404).json({ status: 404, message: e.message });
    }

    return res.status(400).json({ status: 400, message: e.message });
};

// Validaciones de formato de los campos opcionales. Devuelve un mensaje de error o null si todo es válido.
const validarCampos = ({ imagenes, precio, disponible, destacada }) => {
    if (imagenes !== undefined) {
        if (!Array.isArray(imagenes) || imagenes.some(img => typeof img !== 'string' || img.trim() === '')) {
            return 'El campo imagenes debe ser un arreglo de strings no vacíos.';
        }
    }

    if (precio !== undefined && precio !== null) {
        if (typeof precio !== 'number' || Number.isNaN(precio) || precio < 0) {
            return 'El campo precio debe ser un número mayor o igual a 0.';
        }
    }

    if (disponible !== undefined && typeof disponible !== 'boolean') {
        return 'El campo disponible debe ser true o false.';
    }

    if (destacada !== undefined && typeof destacada !== 'boolean') {
        return 'El campo destacada debe ser true o false.';
    }

    return null;
};

exports.crearPublicacion = async function (req, res) {
    const { nombre, descripcion, categoria } = req.body;

    // Validación de campos requeridos
    if (!nombre || !descripcion || !categoria) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre, descripcion y categoria."
        });
    }

    const errorValidacion = validarCampos(req.body);
    if (errorValidacion) {
        return res.status(400).json({ status: 400, message: errorValidacion });
    }

    try {
        const publicacionCreada = await PublicacionService.crearPublicacion(req.body);

        console.log(`¡Éxito! Se creó la publicación: ${publicacionCreada.nombre}`);

        return res.status(201).json({
            status: 201,
            data: publicacionCreada,
            message: "Publicación creada exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.modificarPublicacion = async function (req, res) {
    const { id } = req.params;
    const { nombre, descripcion, categoria } = req.body;

    // Si vienen los campos requeridos, no pueden quedar vacíos
    if ((nombre !== undefined && !nombre) ||
        (descripcion !== undefined && !descripcion) ||
        (categoria !== undefined && !categoria)) {
        return res.status(400).json({
            status: 400,
            message: "Los campos nombre, descripcion y categoria no pueden estar vacíos."
        });
    }

    const errorValidacion = validarCampos(req.body);
    if (errorValidacion) {
        return res.status(400).json({ status: 400, message: errorValidacion });
    }

    try {
        const publicacionModificada = await PublicacionService.modificarPublicacion(id, req.body);

        console.log(`¡Éxito! Se modificó la publicación: ${publicacionModificada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: publicacionModificada,
            message: "Publicación modificada exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.cambiarEstado = async function (req, res) {
    const { id } = req.params;
    const { activa } = req.body;

    if (typeof activa !== 'boolean') {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar activa (true o false)."
        });
    }

    try {
        const publicacionModificada = await PublicacionService.cambiarEstado(id, activa);

        const accion = activa ? 'activada' : 'desactivada';
        console.log(`¡Éxito! Publicación ${accion}: ${publicacionModificada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: publicacionModificada,
            message: `Publicación ${accion} exitosamente`
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.eliminarPublicacion = async function (req, res) {
    const { id } = req.params;

    try {
        const publicacionEliminada = await PublicacionService.eliminarPublicacion(id);

        console.log(`¡Éxito! Se eliminó la publicación: ${publicacionEliminada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: publicacionEliminada,
            message: "Publicación eliminada exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.obtenerPublicacion = async function (req, res) {
    const { id } = req.params;

    try {
        const publicacion = await PublicacionService.obtenerPublicacion(id);

        return res.status(200).json({
            status: 200,
            data: publicacion,
            message: "Publicación obtenida exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.listarPublicaciones = async function (req, res) {
    try {
        const publicaciones = await PublicacionService.listarPublicaciones();

        return res.status(200).json({
            status: 200,
            data: publicaciones,
            message: "Publicaciones obtenidas exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};
