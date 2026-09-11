const express = require('express');
const router = express.Router();
const InstitutionController = require('../controllers/institution.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Crear una institucion 
router.post('/create', authMiddleware, InstitutionController.crearInstitucion);

// Modificar informacion institucional por ID 
router.put('/:id', authMiddleware, InstitutionController.modificarInstitucion);

module.exports = router;