const mongoose = require('mongoose');

const TokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        // Índice TTL: MongoDB elimina el documento automáticamente al expirar
        index: { expires: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TokenBlacklist', TokenBlacklistSchema);