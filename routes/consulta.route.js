const express = require('express');
const router = express.Router();
const ConsultaController = require('../controllers/consulta.controller');
const authMiddleware = require('../middlewares/auth.middleware'); 

// Enviar una consulta de contacto (público, sin autenticación)
router.post('/create', ConsultaController.crearConsulta);

// Modificar el estado de una consulta (protegido para administradores)
router.put('/:id/estado', authMiddleware, ConsultaController.modificarEstado);

// Eliminar una consulta (protegido para administradores)
router.delete('/:id', authMiddleware, ConsultaController.eliminarConsulta);

module.exports = router;