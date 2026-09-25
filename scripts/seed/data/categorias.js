// ============================================================
// CATEGORÍAS
// ------------------------------------------------------------
// Para agregar una categoría, sumar un objeto al array.
// Campos requeridos por POST /api/category/create:
//   nombre (único)
//
// Las publicaciones referencian a la categoría por este
// `nombre` (ver data/publicaciones.js), así que si se renombra
// una acá hay que actualizarla también allá.
// ============================================================

module.exports = [
    { nombre: 'Musculación' },
    { nombre: 'Cardio' },
    { nombre: 'Entrenamiento personal' },
    { nombre: 'Nutrición y suplementos' }
];
