const express = require('express');
const router = express.Router();
const ConsultaController = require('../controllers/consulta.controller');

// Enviar una consulta de contacto (público, sin autenticación)
router.post('/create', ConsultaController.crearConsulta);

module.exports = router;