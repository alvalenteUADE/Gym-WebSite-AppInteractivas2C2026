require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

// IMPORTAMOS LAS NUEVAS RUTAS ACÁ:
const institutionRouter = require('./routes/institution.route');
const userRouter = require('./routes/api/user.route');

const consultaRouter = require('./routes/consulta.route'); 

const categoryRouter = require('./routes/category.route');
const publicacionRouter = require('./routes/publicacion.route');


const app = express();

app.use(cors());
// Límite ampliado para permitir imágenes en base64 dentro del JSON
app.use(express.json({ limit: '10mb' }));

(async () => {
    await connectDB();

    app.get('/', (req, res) => {
        res.send('¡API del Gimnasio funcionando correctamente!');
    });

    // LE DECIMOS A EXPRESS QUE LAS USE ACÁ:
    app.use('/api/institution', institutionRouter);
    app.use('/api/user', userRouter);

    app.use('/api/consulta', consultaRouter);

    app.use('/api/category', categoryRouter);
    app.use('/api/publicacion', publicacionRouter);


    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();