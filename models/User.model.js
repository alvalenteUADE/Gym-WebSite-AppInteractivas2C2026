const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, 
{
    // Agregamos automáticamente la fecha de creación y actualización
    timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);