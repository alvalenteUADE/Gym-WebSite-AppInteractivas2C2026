const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://alvalenteuade_db_user:Password01@cluster0.qkuw4vx.mongodb.net/GymDB';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('¡Conectado exitosamente a MongoDB!');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

module.exports = connectDB;