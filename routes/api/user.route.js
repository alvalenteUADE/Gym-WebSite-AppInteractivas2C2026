const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');

// Registro de administrador
router.post('/register', UserController.registrarAdmin);

// Inicio de sesión de administrador
router.post('/login', UserController.loginAdmin);

module.exports = router;