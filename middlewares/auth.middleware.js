const jwt = require('jsonwebtoken');

// Verifica el token JWT generado por el login de administrador.
// Se espera el header: Authorization: Bearer <token>
module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 401,
            message: "Token no proporcionado. Inicie sesión para realizar esta operación."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const datosToken = jwt.verify(token, process.env.JWT_SECRET);

        // Dejamos disponibles los datos del administrador para los siguientes handlers
        req.usuario = datosToken;

        next();
    } catch (e) {
        return res.status(401).json({
            status: 401,
            message: "Token inválido o expirado. Vuelva a iniciar sesión."
        });
    }
};
