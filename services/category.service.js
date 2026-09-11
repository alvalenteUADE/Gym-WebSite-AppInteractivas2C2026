const Category = require('../models/Category.model');

exports.crearCategoria = async function (data, adminId) {
    try {
        const { nombre, descripcion } = data;

        if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
            throw new Error('El nombre de la categoría es obligatorio y debe ser un texto válido.');
        }

        const nombreNormalizado = nombre.trim();

        // Validación case-insensitive para evitar duplicados
        const existeCategoria = await Category.findOne({
            nombre: { $regex: new RegExp(`^${nombreNormalizado}$`, 'i') }
        });

        if (existeCategoria) {
            throw new Error('Ya existe una categoría con ese nombre.');
        }

        const nuevaCategoria = new Category({
            nombre: nombreNormalizado,
            descripcion: typeof descripcion === 'string' ? descripcion.trim() : '',
            creadoPor: adminId
        });

        return await nuevaCategoria.save();
    } catch (e) {
        if (e.code === 11000 || e.message === 'Ya existe una categoría con ese nombre.') {
            throw new Error('Ya existe una categoría con ese nombre.');
        }
        console.error('Error en category.service al crear:', e);
        throw e;
    }
};