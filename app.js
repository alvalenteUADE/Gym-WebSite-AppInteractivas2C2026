require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

// Importación de routers personalizados
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
// Límite ampliado para permitir imágenes en base64 dentro del JSON
app.use(express.json({ limit: '10mb' }));

(async () => {
    await connectDB();

    // Definición de rutas
    app.use('/api', apiRouter); // Las rutas que comienzan con /api usarán el router apiRouter
    app.use('/', indexRouter);  // Las rutas base usarán el router indexRouter

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();