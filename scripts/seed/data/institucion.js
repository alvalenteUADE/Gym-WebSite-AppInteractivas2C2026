// ============================================================
// INFORMACIÓN INSTITUCIONAL
// ------------------------------------------------------------
// Datos del comercio. Es un único objeto (el sitio tiene una
// sola institución).
// Campos de POST /api/institution/create:
//   nombre             (requerido)
//   descripcion        (opcional)
//   direccion          (requerido)
//   telefono           (requerido)
//   redes_sociales     (opcional)
//   horarios_atencion  (requerido)
// ============================================================

module.exports = {
    nombre: 'Fitness Gym',
    descripcion: 'Gimnasio con equipamiento de última generación, clases grupales, entrenadores personales y asesoramiento nutricional.',
    direccion: 'Av. Corrientes 1234, CABA',
    telefono: '011-4555-1234',
    redes_sociales: 'Instagram: @fitnessgym | Facebook: /fitnessgym',
    horarios_atencion: 'Lunes a Viernes 7:00 a 23:00 - Sábados 9:00 a 20:00'
};
