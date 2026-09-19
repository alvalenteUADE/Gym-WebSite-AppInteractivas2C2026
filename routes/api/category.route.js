const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/category.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Listar todas las categorías (público, lo usa el sitio para filtrar publicaciones)
router.get('/', CategoryController.listarCategorias);

// Las operaciones de escritura requieren el token JWT de un administrador

// Crear una categoría
router.post('/create', authMiddleware, CategoryController.crearCategoria);

// Modificar una categoría por ID
router.put('/:id', authMiddleware, CategoryController.modificarCategoria);

// Eliminar una categoría por ID
router.delete('/:id', authMiddleware, CategoryController.eliminarCategoria);

module.exports = router;
