const CategoryService = require('../services/category.service');

exports.crearCategoria = async function (req, res) {
    try {
        const adminId = req.usuario && req.usuario.id;

        const resultado = await CategoryService.crearCategoria(req.body, adminId);

        return res.status(201).json({
            status: 201,
            data: resultado,
            message: "Categoría creada exitosamente"
        });
    } catch (e) {
        if (e.message === 'Ya existe una categoría con ese nombre.') {
            return res.status(409).json({
                status: 409,
                message: e.message
            });
        }

        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};