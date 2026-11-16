const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    rol: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente' // Por defecto, todo registro público es cliente
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    }
}, 
{
    // Agregamos automáticamente la fecha de creación y actualización
    timestamps: true 
});

// Middleware PRE-SAVE: Hashea la contraseña automáticamente antes de guardarla en la BD
UserSchema.pre('save', async function () {
    // Si la contraseña no ha sido modificada, salimos
    if (!this.isModified('password')) {
        return;
    }

    try {
        // Si ya viene hasheada (por seguridad extra), evitamos un doble hash
        const esHashBcrypt = this.password && (
            this.password.startsWith('$2a$') || 
            this.password.startsWith('$2b$') || 
            this.password.startsWith('$2$')
        );

        if (!esHashBcrypt) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    } catch (error) {
        throw error;
    }
});

module.exports = mongoose.model('User', UserSchema);