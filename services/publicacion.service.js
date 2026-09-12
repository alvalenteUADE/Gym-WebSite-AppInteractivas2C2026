const mongoose = require('mongoose');
const Publicacion = require('../models/Publicacion.model');
const Category = require('../models/Category.model');

const MSG_NO_ENCONTRADA = 'No se encontró la publicación con ese ID';
const MSG_CATEGORIA_NO_ENCONTRADA = 'No se encontró la categoría indicada';

// Verifica que la categoría exista antes de asociarla a una publicación
const validarCategoria = async (categoriaId) => {
    if (!mongoose.isValidObjectId(categoriaId)) {
        throw new Error(MSG_CATEGORIA_NO_ENCONTRADA);
    }
    const existe = await Category.findById(categoriaId);
    if (!existe) {
        throw new Error(MSG_CATEGORIA_NO_ENCONTRADA);
    }
};

exports.crearPublicacion = async function (data) {
    try {
        const { nombre, descripcion, categoria, imagenes, precio, disponible, destacada } = data;

        await validarCategoria(categoria);

        const nuevaPublicacion = new Publicacion({
            nombre,
            descripcion,
            categoria,
            imagenes,
            precio,
            disponible,
            destacada
        });

        const publicacionGuardada = await nuevaPublicacion.save();

        return await publicacionGuardada.populate('categoria', 'nombre');
    } catch (e) {
        if (e.message === MSG_CATEGORIA_NO_ENCONTRADA) {
            throw e;
        }
        console.error('Error en el servicio de Publicacion:', e);
        throw new Error('Error al guardar la publicación en la base de datos');
    }
};

exports.modificarPublicacion = async function (id, datosActualizados) {
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        if (!datosActualizados || Object.keys(datosActualizados).length === 0) {
            throw new Error('No se enviaron datos para actualizar');
        }

        // Filtrar exclusivamente los campos permitidos para prevenir inyecciones de operadores de MongoDB
        const { nombre, descripcion, categoria, imagenes, precio, disponible, destacada } = datosActualizados;
        const actualizacion = {};

        if (nombre !== undefined) actualizacion.nombre = nombre;
        if (descripcion !== undefined) actualizacion.descripcion = descripcion;
        if (imagenes !== undefined) actualizacion.imagenes = imagenes;
        if (precio !== undefined) actualizacion.precio = precio;
        if (disponible !== undefined) actualizacion.disponible = disponible;
        if (destacada !== undefined) actualizacion.destacada = destacada;

        if (categoria !== undefined) {
            await validarCategoria(categoria);
            actualizacion.categoria = categoria;
        }

        if (Object.keys(actualizacion).length === 0) {
            throw new Error('No se enviaron campos válidos para actualizar');
        }

        // Se busca por ID y se actualiza usando $set explícito
        const publicacionModificada = await Publicacion.findByIdAndUpdate(
            id,
            { $set: actualizacion },
            { new: true, runValidators: true }
        ).populate('categoria', 'nombre');

        if (!publicacionModificada) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        return publicacionModificada;
    } catch (e) {
        console.error('Error en el servicio de Publicacion al modificar:', e);
        throw e;
    }
};

// Baja lógica: activa o desactiva la publicación sin eliminarla
exports.cambiarEstado = async function (id, activa) {
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        const publicacionModificada = await Publicacion.findByIdAndUpdate(
            id,
            { $set: { activa } },
            { new: true, runValidators: true }
        ).populate('categoria', 'nombre');

        if (!publicacionModificada) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        return publicacionModificada;
    } catch (e) {
        console.error('Error en el servicio de Publicacion al cambiar estado:', e);
        throw e;
    }
};

// Borrado físico
exports.eliminarPublicacion = async function (id) {
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        const publicacionEliminada = await Publicacion.findByIdAndDelete(id);

        if (!publicacionEliminada) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        return publicacionEliminada;
    } catch (e) {
        console.error('Error en el servicio de Publicacion al eliminar:', e);
        throw e;
    }
};

exports.obtenerPublicacion = async function (id) {
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        const publicacion = await Publicacion.findById(id).populate('categoria', 'nombre');

        if (!publicacion) {
            throw new Error(MSG_NO_ENCONTRADA);
        }

        return publicacion;
    } catch (e) {
        console.error('Error en el servicio de Publicacion al obtener:', e);
        throw e;
    }
};

// Devuelve todas las publicaciones con todos sus datos (incluye las desactivadas)
exports.listarPublicaciones = async function () {
    try {
        return await Publicacion.find()
            .populate('categoria', 'nombre')
            .sort({ createdAt: -1 });
    } catch (e) {
        console.error('Error en el servicio de Publicacion al listar:', e);
        throw new Error('Error al obtener las publicaciones de la base de datos');
    }
};
