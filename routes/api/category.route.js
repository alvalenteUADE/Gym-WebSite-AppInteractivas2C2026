const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/category.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/', authMiddleware, CategoryController.crearCategoria);

module.exports = router;