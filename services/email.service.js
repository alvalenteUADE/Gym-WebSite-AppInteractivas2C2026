const nodemailer = require('nodemailer');

// Arma el transporter de Nodemailer a partir de las variables de entorno.
// Devuelve null si no hay SMTP configurado, para poder usar el fallback por consola.
const crearTransporter = () => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return null;
    }

    const puerto = parseInt(SMTP_PORT, 10) || 587;

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: puerto,
        secure: puerto === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
};

// Envía un correo con el contenido de la consulta al gimnasio.
// Si no hay SMTP configurado, loguea el correo en consola (mismo criterio
// que la recuperación de contraseña) para no bloquear el flujo de contacto.
exports.enviarCorreoConsulta = async function (consulta) {
    const remitente = process.env.SMTP_FROM || process.env.SMTP_USER;
    const destinatario = process.env.GYM_EMAIL;
    const asuntoCorreo = `Nueva consulta: ${consulta.asunto}`;
    const cuerpo = [
        'Se recibió una nueva consulta desde el formulario de contacto.',
        '',
        `Nombre y apellido: ${consulta.nombre}`,
        `Correo electrónico: ${consulta.correo}`,
        `Teléfono: ${consulta.telefono || 'No informado'}`,
        `Asunto: ${consulta.asunto}`,
        '',
        'Mensaje:',
        consulta.mensaje
    ].join('\n');

    if (!destinatario) {
        console.warn('[CONSULTA] GYM_EMAIL no está configurado. No se pudo determinar el destinatario.');
        return { enviado: false, motivo: 'GYM_EMAIL no configurado' };
    }

    const transporter = crearTransporter();

    // Fallback por consola cuando no hay credenciales SMTP cargadas.
    if (!transporter) {
        console.log('==========================================');
        console.log(`[CONSULTA] SMTP no configurado. Correo pendiente (fallback consola)`);
        console.log(`Para: ${destinatario}`);
        console.log(`Asunto: ${asuntoCorreo}`);
        console.log(cuerpo);
        console.log('==========================================');
        return { enviado: false, motivo: 'SMTP no configurado' };
    }

    await transporter.sendMail({
        from: remitente,
        to: destinatario,
        replyTo: consulta.correo,
        subject: asuntoCorreo,
        text: cuerpo
    });

    return { enviado: true };
};
