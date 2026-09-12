const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true // Agrega automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('Category', CategorySchema);
