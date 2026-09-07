const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const verificarToken = require('../middlewares/auth.middleware');

// Listado público: lo consume tanto el administrador al crear un producto/servicio
// como el sitio público para filtrar las publicaciones por categoría.
router.get('/', CategoryController.listarCategorias);

// El alta, la modificación y la baja son exclusivas del administrador,
// por eso pasan primero por la verificación del token del login.
router.post('/create', verificarToken, CategoryController.crearCategoria);
router.put('/:id', verificarToken, CategoryController.modificarCategoria);
router.delete('/:id', verificarToken, CategoryController.eliminarCategoria);

module.exports = router;
