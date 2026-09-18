const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        required: false
    },
    asunto: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Leída', 'Respondida'],
        default: 'Pendiente'
    }
}, {
    // Agregamos automáticamente la fecha de creación y actualización
    timestamps: true
});

module.exports = mongoose.model('Consulta', ConsultaSchema);