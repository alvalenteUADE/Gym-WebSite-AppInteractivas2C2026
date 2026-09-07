const CategoryService = require('../services/category.service');

// Traduce el error del service al status code que corresponde
const resolverError = function (res, e) {
    if (e.message === CategoryService.CATEGORIA_NO_ENCONTRADA) {
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

exports.crearCategoria = async function (req, res) {
    const { nombre } = req.body;
    //validación de campos requeridos
    if (!nombre) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre."
        });
    }

    try {
        const categoriaCreada = await CategoryService.crearCategoria(req.body);

        console.log(`¡Éxito! Se creó la categoría: ${categoriaCreada.nombre}`);

        return res.status(201).json({
            status: 201,
            data: categoriaCreada,
            message: "Categoría creada exitosamente"
        });
    } catch (e) {
        return resolverError(res, e);
    }
}

exports.listarCategorias = async function (req, res) {
    try {
        const categorias = await CategoryService.listarCategorias();

        return res.status(200).json({
            status: 200,
            data: categorias,
            message: "Categorías obtenidas exitosamente"
        });
    } catch (e) {
        return resolverError(res, e);
    }
}

exports.modificarCategoria = async function (req, res) {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({
            status: 400,
            message: "Faltan campos requeridos. Asegúrese de enviar nombre."
        });
    }

    try {
        const categoriaActualizada = await CategoryService.modificarCategoria(req.params.id, req.body);

        console.log(`¡Éxito! Se modificó la categoría: ${categoriaActualizada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: categoriaActualizada,
            message: "Categoría modificada exitosamente"
        });
    } catch (e) {
        return resolverError(res, e);
    }
}

exports.eliminarCategoria = async function (req, res) {
    try {
        const categoriaEliminada = await CategoryService.eliminarCategoria(req.params.id);

        console.log(`¡Éxito! Se eliminó la categoría: ${categoriaEliminada.nombre}`);

        return res.status(200).json({
            status: 200,
            data: categoriaEliminada,
            message: "Categoría eliminada exitosamente"
        });
    } catch (e) {
        return resolverError(res, e);
    }
}
