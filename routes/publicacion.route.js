const express = require('express');
const router = express.Router();
const PublicacionController = require('../controllers/publicacion.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Listar todas las publicaciones (público)
router.get('/', PublicacionController.listarPublicaciones);

// Obtener una publicación por ID (público)
router.get('/:id', PublicacionController.obtenerPublicacion);

// Las operaciones de escritura requieren el token JWT de un administrador

// Crear una publicación
router.post('/create', authMiddleware, PublicacionController.crearPublicacion);

// Modificar una publicación por ID
router.put('/:id', authMiddleware, PublicacionController.modificarPublicacion);

// Activar o desactivar una publicación (baja lógica)
router.patch('/:id/estado', authMiddleware, PublicacionController.cambiarEstado);

// Eliminar una publicación por ID (borrado físico)
router.delete('/:id', authMiddleware, PublicacionController.eliminarPublicacion);

module.exports = router;
