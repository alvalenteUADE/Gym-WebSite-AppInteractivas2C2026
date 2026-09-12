const CategoryService = require('../services/category.service');

// Traduce los mensajes de error del servicio al código HTTP correspondiente
const responderError = (res, e) => {
    if (e.message === 'No se encontró la categoría con ese ID') {
        return res.status(404).json({ status: 404, message: e.message });
    }

    if (e.message === 'Ya existe una categoría con ese nombre.' ||
        e.message === 'No se puede eliminar la categoría porque tiene publicaciones asociadas.') {
        return res.status(409).json({ status: 409, message: e.message });
    }

    return res.status(400).json({ status: 400, message: e.message });
};

exports.crearCategoria = async function (req, res) {
    const { nombre } = req.body;

    // Validación de campos requeridos
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre."
        });
    }

    try {
        const categoriaCreada = await CategoryService.crearCategoria({ nombre });

        console.log(`¡Éxito! Se creó la categoría: ${categoriaCreada.nombre}`);

        return res.status(201).json({
            status: 201,
            data: categoriaCreada,
            message: "Categoría creada exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.modificarCategoria = async function (req, res) {
    const { id } = req.params;
    const { nombre } = req.body;

    if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim() === '')) {
        return res.status(400).json({
            status: 400,
            message: "El nombre de la categoría no puede estar vacío."
        });
    }

    try {
        const categoriaModificada = await CategoryService.modificarCategoria(id, req.body);

        console.log(`¡Éxito! Se modificó la categoría: ${categoriaModificada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: categoriaModificada,
            message: "Categoría modificada exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.eliminarCategoria = async function (req, res) {
    const { id } = req.params;

    try {
        const categoriaEliminada = await CategoryService.eliminarCategoria(id);

        console.log(`¡Éxito! Se eliminó la categoría: ${categoriaEliminada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: categoriaEliminada,
            message: "Categoría eliminada exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};

exports.listarCategorias = async function (req, res) {
    try {
        const categorias = await CategoryService.listarCategorias();

        return res.status(200).json({
            status: 200,
            data: categorias,
            message: "Categorías obtenidas exitosamente"
        });
    } catch (e) {
        return responderError(res, e);
    }
};
