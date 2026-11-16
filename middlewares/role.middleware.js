
exports.verificarAdmin = (req, res, next) => {
    try {
        // req.usuario fue inyectado previamente por el middleware de autenticación del token
        if (req.usuario && req.usuario.rol === 'admin') {
            return next(); // Es administrador, puede continuar
        }

        return res.status(403).json({
            status: 403,
            message: 'Acceso denegado. Se requieren privilegios de administrador.'
        });
    } catch (error) {
        console.error('Error al verificar el rol de administrador:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error interno al validar los permisos.'
        });
    }
};