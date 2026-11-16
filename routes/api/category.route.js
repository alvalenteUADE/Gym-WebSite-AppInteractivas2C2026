const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/category.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { verificarAdmin } = require('../../middlewares/role.middleware');

// Listar todas las categorías (público, lo usa el sitio para filtrar publicaciones)
router.get('/', CategoryController.listarCategorias);

// Las operaciones de escritura requieren autenticación y rol de administrador

// Crear una categoría
router.post('/create', authMiddleware, verificarAdmin, CategoryController.crearCategoria);

// Modificar una categoría por ID
router.put('/:id', authMiddleware, verificarAdmin, CategoryController.modificarCategoria);

// Eliminar una categoría por ID
router.delete('/:id', authMiddleware, verificarAdmin, CategoryController.eliminarCategoria);

module.exports = router;