const express = require('express');
const router = express.Router();
const ConsultaController = require('../../controllers/consulta.controller');
const authMiddleware = require('../../middlewares/auth.middleware'); 
const { verificarAdmin } = require('../../middlewares/role.middleware');

// Enviar una consulta de contacto (público, sin autenticación)
router.post('/create', ConsultaController.crearConsulta);

// Listar las consultas recibidas (solo administradores autenticados)
router.get('/', authMiddleware, verificarAdmin, ConsultaController.listarConsultas);

// Modificar el estado de una consulta (protegido para administradores)
router.put('/:id/estado', authMiddleware, verificarAdmin, ConsultaController.modificarEstado);

// Eliminar una consulta (protegido para administradores)
router.delete('/:id', authMiddleware, verificarAdmin, ConsultaController.eliminarConsulta);

module.exports = router;