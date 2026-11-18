const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { verificarAdmin } = require('../../middlewares/role.middleware');

// 1. Registro PÚBLICO para clientes estándar
router.post('/register', UserController.registrarCliente);

// 2. Registro PRIVADO de administradores (protegido: solo un admin logueado puede crear otro)
router.post('/register-admin', authMiddleware, verificarAdmin, UserController.registrarAdmin);

// Inicio de sesión (sirve para ambos roles; el token llevará incrustado su rol correspondiente)
router.post('/login', UserController.loginAdmin);

// Cierre de sesión de administrador (protegido)
router.post('/logout', authMiddleware, UserController.cerrarSesionAdmin);

// Solicitud de recuperación de contraseña
router.post('/forgot-password', UserController.solicitarRecuperacionPassword);

// Restablecimiento de contraseña mediante token
router.post('/reset-password', UserController.restablecerPassword);

// Modificación de datos personales (protegido con token JWT)
router.get('/clientes/count', authMiddleware, verificarAdmin, UserController.contarClientes);

router.put('/profile', authMiddleware, UserController.modificarAdmin);

module.exports = router;