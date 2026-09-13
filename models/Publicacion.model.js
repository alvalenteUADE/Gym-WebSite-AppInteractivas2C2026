const mongoose = require('mongoose');

const PublicacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // Las imágenes se guardan directamente en el documento (URL o data URI en base64)
    imagenes: {
        type: [String],
        default: []
    },
    // Opcional según el rubro: un servicio puede no tener precio
    precio: {
        type: Number,
        required: false,
        min: 0
    },
    // Estado de disponibilidad del producto/servicio (ej: cupo agotado)
    disponible: {
        type: Boolean,
        default: true
    },
    // Baja lógica: si es false la publicación está desactivada
    activa: {
        type: Boolean,
        default: true
    },
    // Publicación destacada (funcionalidad adicional)
    destacada: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Agrega automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);
