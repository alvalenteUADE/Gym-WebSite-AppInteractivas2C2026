const express = require('express');
const router = express.Router();
const InstitutionController = require('../../controllers/institution.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { verificarAdmin } = require('../../middlewares/role.middleware');

// Obtener la información institucional (ruta pública o protegida según prefieras, acá la dejamos accesible para mostrarla)
router.get('/', InstitutionController.obtenerInstitucion); 

// Crear una institucion 
router.post('/create', authMiddleware, verificarAdmin, InstitutionController.crearInstitucion);

// Modificar informacion institucional por ID 
router.put('/:id', authMiddleware, verificarAdmin, InstitutionController.modificarInstitucion);

module.exports = router;