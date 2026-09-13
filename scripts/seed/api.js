// Cliente HTTP mínimo para consumir la API desde el script de seed.
// Usa el fetch nativo de Node (>= 18), no requiere dependencias extra.

const BASE_URL = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;

// Realiza una request y devuelve { status, body }. No lanza error por códigos HTTP,
// cada paso del seed decide qué hacer con la respuesta.
async function request(method, path, { body, token } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let respuesta;
    try {
        respuesta = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined
        });
    } catch (e) {
        throw new Error(`No se pudo conectar con la API en ${BASE_URL}. ¿Está corriendo el servidor? (${e.message})`);
    }

    let json = null;
    try {
        json = await respuesta.json();
    } catch (_) {
        // Respuestas sin cuerpo JSON (ej: GET /)
    }

    return { status: respuesta.status, body: json };
}

module.exports = {
    BASE_URL,
    get: (path, opts) => request('GET', path, opts),
    post: (path, body, opts) => request('POST', path, { ...opts, body }),
    put: (path, body, opts) => request('PUT', path, { ...opts, body }),
    patch: (path, body, opts) => request('PATCH', path, { ...opts, body }),
    del: (path, opts) => request('DELETE', path, opts)
};
