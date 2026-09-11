const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist.model');

module.exports = async function (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ status: 401, message: 'Acceso denegado. No se proporcionó un token.' });
    }

    // Espera el formato: "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Revisamos si el token fue revocado al cerrar sesión
        const tokenRevocado = await TokenBlacklist.findOne({ token });
        if (tokenRevocado) {
            return res.status(401).json({ status: 401, message: 'Sesión cerrada. El token ya no es válido.' });
        }

        req.usuario = decoded; // Deja los datos del admin disponibles en req
        req.token = token; // Deja el token crudo disponible para el cierre de sesión
        next(); // Continúa hacia el controlador
    } catch (error) {
        return res.status(403).json({ status: 403, message: 'Token inválido o expirado.' });
    }
};