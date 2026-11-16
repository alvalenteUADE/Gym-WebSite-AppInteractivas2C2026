const express = require('express');
const router = express.Router();
const PublicacionController = require('../../controllers/publicacion.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { verificarAdmin } = require('../../middlewares/role.middleware');

// Listar todas las publicaciones (público)
router.get('/', PublicacionController.listarPublicaciones);

// Obtener una publicación por ID (público)
router.get('/:id', PublicacionController.obtenerPublicacion);

// Las operaciones de escritura requieren autenticación y rol de administrador

// Crear una publicación
router.post('/create', authMiddleware, verificarAdmin, PublicacionController.crearPublicacion);

// Modificar una publicación por ID
router.put('/:id', authMiddleware, verificarAdmin, PublicacionController.modificarPublicacion);

// Activar o desactivar una publicación (baja lógica)
router.patch('/:id/estado', authMiddleware, verificarAdmin, PublicacionController.cambiarEstado);

// Eliminar una publicación por ID (borrado físico)
router.delete('/:id', authMiddleware, verificarAdmin, PublicacionController.eliminarPublicacion);

module.exports = router;