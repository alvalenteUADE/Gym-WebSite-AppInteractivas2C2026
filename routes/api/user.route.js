const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Registro de administrador
router.post('/register', UserController.registrarAdmin);

// Inicio de sesión de administrador
router.post('/login', UserController.loginAdmin);

// Cierre de sesión de administrador (protegido)
router.post('/logout', authMiddleware, UserController.cerrarSesionAdmin);

// Solicitud de recuperación de contraseña
router.post('/forgot-password', UserController.solicitarRecuperacionPassword);

// Restablecimiento de contraseña mediante token
router.post('/reset-password', UserController.restablecerPassword);

// Modificación de datos personales (protegido con token JWT)
router.put('/profile', authMiddleware, UserController.modificarAdmin);

module.exports = router;