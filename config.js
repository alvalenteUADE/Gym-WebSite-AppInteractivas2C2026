const mongoose = require('mongoose');

const dbURL = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!dbURL) {
            throw new Error('MONGODB_URI no está configurada');
        }
        await mongoose.connect(dbURL);
        console.log('¡Conectado exitosamente a MongoDB!');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

module.exports = connectDB;