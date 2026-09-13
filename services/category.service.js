const mongoose = require('mongoose');
const Category = require('../models/Category.model');
const Publicacion = require('../models/Publicacion.model');

exports.crearCategoria = async function (data) {
    try {
        const nombreNormalizado = data.nombre.trim();

        const existeCategoria = await Category.findOne({ nombre: nombreNormalizado });
        if (existeCategoria) {
            throw new Error('Ya existe una categoría con ese nombre.');
        }

        const nuevaCategoria = new Category({ nombre: nombreNormalizado });
        const categoriaGuardada = await nuevaCategoria.save();

        return categoriaGuardada;
    } catch (e) {
        if (e.code === 11000 || e.message === 'Ya existe una categoría con ese nombre.') {
            throw new Error('Ya existe una categoría con ese nombre.');
        }
        console.error('Error en el servicio de Category:', e);
        throw new Error('Error al guardar la categoría en la base de datos');
    }
};

exports.modificarCategoria = async function (id, datosActualizados) {
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error('No se encontró la categoría con ese ID');
        }

        if (!datosActualizados || Object.keys(datosActualizados).length === 0) {
            throw new Error('No se enviaron datos para actualizar');
        }

        // Filtrar exclusivamente los campos permitidos para prevenir inyecciones de operadores de MongoDB
        const { nombre } = datosActualizados;
        const actualizacion = {};

        if (nombre !== undefined) {
            const nombreNormalizado = nombre.trim();

            const existeNombre = await Category.findOne({
                nombre: nombreNormalizado,
                _id: { $ne: id }
            });

            if (existeNombre) {
                throw new Error('Ya existe una categoría con ese nombre.');
            }

            actualizacion.nombre = nombreNormalizado;
        }

        if (Object.keys(actualizacion).length === 0) {
            throw new Error('No se enviaron campos válidos para actualizar');
        }

        // Se busca por ID y se actualiza usando $set explícito
        const categoriaModificada = await Category.findByIdAndUpdate(
            id,
            { $set: actualizacion },
            { new: true, runValidators: true }
        );

        if (!categoriaModificada) {
            throw new Error('No se encontró la categoría con ese ID');
        }

        return categoriaModificada;
    } catch (e) {
        if (e.code === 11000) {
            throw new Error('Ya existe una categoría con ese nombre.');
        }
        console.error('Error en el servicio de Category al modificar:', e);
        throw e;
    }
};

exports.eliminarCategoria = async function (id) {
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error('No se encontró la categoría con ese ID');
        }

        // No se puede eliminar una categoría que tenga publicaciones asociadas
        const publicacionesAsociadas = await Publicacion.countDocuments({ categoria: id });
        if (publicacionesAsociadas > 0) {
            throw new Error('No se puede eliminar la categoría porque tiene publicaciones asociadas.');
        }

        const categoriaEliminada = await Category.findByIdAndDelete(id);

        if (!categoriaEliminada) {
            throw new Error('No se encontró la categoría con ese ID');
        }

        return categoriaEliminada;
    } catch (e) {
        console.error('Error en el servicio de Category al eliminar:', e);
        throw e;
    }
};

exports.listarCategorias = async function () {
    try {
        // Ordenadas alfabéticamente para que el listado sea predecible
        return await Category.find().sort({ nombre: 1 });
    } catch (e) {
        console.error('Error en el servicio de Category al listar:', e);
        throw new Error('Error al obtener las categorías de la base de datos');
    }
};
