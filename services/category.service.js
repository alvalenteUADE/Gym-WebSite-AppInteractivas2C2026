const Category = require('../models/Category.model');

// Mensajes de error que el controller usa para definir el status code de la respuesta
const CATEGORIA_NO_ENCONTRADA = 'Categoría no encontrada.';
const CATEGORIA_DUPLICADA = 'Ya existe una categoría con ese nombre.';
const ID_INVALIDO = 'El ID de la categoría no es válido.';

exports.CATEGORIA_NO_ENCONTRADA = CATEGORIA_NO_ENCONTRADA;
exports.CATEGORIA_DUPLICADA = CATEGORIA_DUPLICADA;
exports.ID_INVALIDO = ID_INVALIDO;

exports.crearCategoria = async function (data) {
    try {
        const { nombre } = data;

        const nuevaCategoria = new Category({ nombre });
        const categoriaGuardada = await nuevaCategoria.save();

        return categoriaGuardada;
    } catch (e) {
        // 11000 es el error de clave duplicada de MongoDB (nombre es único)
        if (e.code === 11000) {
            throw new Error(CATEGORIA_DUPLICADA);
        }
        console.error('Error en el servicio de Category:', e);
        throw new Error('Error al guardar la categoría en la base de datos');
    }
}

exports.listarCategorias = async function () {
    try {
        // Ordenadas alfabéticamente para mostrarlas en los selectores del frontend
        const categorias = await Category.find().sort({ nombre: 1 });

        return categorias;
    } catch (e) {
        console.error('Error en el servicio de Category:', e);
        throw new Error('Error al obtener las categorías de la base de datos');
    }
}

exports.modificarCategoria = async function (id, data) {
    try {
        const { nombre } = data;

        const categoriaActualizada = await Category.findByIdAndUpdate(
            id,
            { nombre },
            { new: true, runValidators: true }
        );

        if (!categoriaActualizada) {
            throw new Error(CATEGORIA_NO_ENCONTRADA);
        }

        return categoriaActualizada;
    } catch (e) {
        if (e.message === CATEGORIA_NO_ENCONTRADA) {
            throw e;
        }
        if (e.code === 11000) {
            throw new Error(CATEGORIA_DUPLICADA);
        }
        // CastError: el id recibido no tiene el formato de un ObjectId de MongoDB
        if (e.name === 'CastError') {
            throw new Error(ID_INVALIDO);
        }
        console.error('Error en el servicio de Category:', e);
        throw new Error('Error al modificar la categoría en la base de datos');
    }
}

exports.eliminarCategoria = async function (id) {
    try {
        const categoriaEliminada = await Category.findByIdAndDelete(id);

        if (!categoriaEliminada) {
            throw new Error(CATEGORIA_NO_ENCONTRADA);
        }

        return categoriaEliminada;
    } catch (e) {
        if (e.message === CATEGORIA_NO_ENCONTRADA) {
            throw e;
        }
        if (e.name === 'CastError') {
            throw new Error(ID_INVALIDO);
        }
        console.error('Error en el servicio de Category:', e);
        throw new Error('Error al eliminar la categoría de la base de datos');
    }
}
