require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

// IMPORTAMOS LAS NUEVAS RUTAS ACÁ:
const institutionRouter = require('./routes/institution.route');
const userRouter = require('./routes/api/user.route'); 

const app = express();

app.use(cors());
app.use(express.json()); 

(async () => {
    await connectDB();

    app.get('/', (req, res) => {
        res.send('¡API del Gimnasio funcionando correctamente!');
    });

    // LE DECIMOS A EXPRESS QUE LAS USE ACÁ:
    app.use('/api/institution', institutionRouter);
    app.use('/api/user', userRouter);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();