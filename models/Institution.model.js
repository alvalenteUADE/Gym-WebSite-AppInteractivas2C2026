const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String, 
        required: false 
    },
    direccion: { 
        type: String, 
        required: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    redes_sociales: { 
        type: String, 
        required: false 
    },
    horarios_atencion: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true // Agrega automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('Institution', InstitutionSchema); // // Exportamos el modelo