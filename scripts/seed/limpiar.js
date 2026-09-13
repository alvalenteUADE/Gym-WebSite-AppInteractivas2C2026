// ============================================================
// LIMPIEZA DE LA BASE DE DATOS
// ------------------------------------------------------------
// Vacía las colecciones antes de cargar los datos de prueba.
// Se hace directo por Mongoose porque la API no expone
// endpoints para borrar usuarios ni para borrados masivos.
//
// Para limpiar una colección más, agregar su modelo al array
// COLECCIONES_A_LIMPIAR.
// ============================================================

const mongoose = require('mongoose');

const User = require('../../models/User.model');
const Category = require('../../models/Category.model');
const Publicacion = require('../../models/Publicacion.model');
const TokenBlacklist = require('../../models/TokenBlacklist.model');

// Colecciones que se vacían en cada corrida del seed.
// Institution queda fuera a propósito: el seed no la recrea.
const COLECCIONES_A_LIMPIAR = [
    Publicacion,
    Category,
    User,
    TokenBlacklist
];

async function limpiarBaseDeDatos(log) {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI no está configurada en el .env');
    }

    // Guarda de seguridad: nunca vaciar una base productiva
    if (process.env.NODE_ENV === 'production') {
        throw new Error('El seed no se ejecuta con NODE_ENV=production');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    log.ok(`Conectado a la base "${mongoose.connection.name}"`);

    for (const modelo of COLECCIONES_A_LIMPIAR) {
        const { deletedCount } = await modelo.deleteMany({});
        log.ok(`${modelo.collection.collectionName}: ${deletedCount} documento(s) eliminado(s)`);
    }

    await mongoose.disconnect();
}

module.exports = limpiarBaseDeDatos;
