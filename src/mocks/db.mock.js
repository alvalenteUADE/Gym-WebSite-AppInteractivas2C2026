// ============================================================
// STORE EN MEMORIA DE LOS MOCKS
// ------------------------------------------------------------
// Única fuente de verdad mientras no haya backend conectado.
// Lo comparten categorias.mock.js y publicaciones.mock.js, así
// las dos pantallas ven lo mismo: si una publicación usa una
// categoría, la pantalla de categorías ve ese uso y no deja
// borrarla (igual que la guarda de category.service.js).
//
// Los datos replican el seed real (scripts/seed/data/) para que
// la UI se pruebe con el volumen que va a tener en producción:
// 20 publicaciones, que es el mínimo que pide la consigna.
//
// Al integrar el backend, este archivo se borra junto con los
// dos .mock.js que lo usan.
// ============================================================

export const LATENCIA_MS = 350

export const demorar = () =>
  new Promise((resolve) => setTimeout(resolve, LATENCIA_MS))

// Las imágenes del seed son URLs de Unsplash. Se usa una sola de
// muestra para no repetir cadenas largas en cada publicación.
const IMG = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'

let categorias = [
  { _id: 'cat-1', nombre: 'Cardio' },
  { _id: 'cat-2', nombre: 'Clases grupales' },
  { _id: 'cat-3', nombre: 'Entrenamiento personal' },
  { _id: 'cat-4', nombre: 'Musculación' },
  { _id: 'cat-5', nombre: 'Nutrición y suplementos' },
  { _id: 'cat-6', nombre: 'Pilates' },
]

// `precio` ausente = servicio sin precio publicado (el modelo lo permite).
let publicaciones = [
  { _id: 'pub-01', nombre: 'Abono mensual sala de musculación', descripcion: 'Acceso ilimitado a la sala de musculación de lunes a domingo. Incluye rutina inicial armada por un instructor.', categoria: 'cat-4', imagenes: [IMG], precio: 25000, disponible: true, activa: true, destacada: true },
  { _id: 'pub-02', nombre: 'Abono trimestral sala de musculación', descripcion: 'Tres meses de acceso ilimitado con un descuento sobre el valor mensual.', categoria: 'cat-4', imagenes: [], precio: 63750, disponible: true, activa: true, destacada: false },
  { _id: 'pub-03', nombre: 'Pase diario', descripcion: 'Acceso por un día a la sala de musculación y al sector de cardio.', categoria: 'cat-4', imagenes: [], precio: 3500, disponible: true, activa: true, destacada: false },
  { _id: 'pub-04', nombre: 'Rutina personalizada de fuerza', descripcion: 'Un instructor armá una rutina adaptada a tu nivel y objetivos, con seguimiento mensual.', categoria: 'cat-4', imagenes: [], precio: 12000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-05', nombre: 'Clase de Spinning', descripcion: 'Clase grupal de ciclismo indoor de 45 minutos con música y entrenador.', categoria: 'cat-1', imagenes: [IMG], precio: 4500, disponible: true, activa: true, destacada: true },
  { _id: 'pub-06', nombre: 'Sector cardio: cintas y elípticos', descripcion: 'Uso libre del sector de cardio incluido en cualquier abono vigente.', categoria: 'cat-1', imagenes: [], disponible: true, activa: true, destacada: false },
  { _id: 'pub-07', nombre: 'Running Team', descripcion: 'Entrenamiento grupal de running al aire libre, dos veces por semana.', categoria: 'cat-1', imagenes: [], precio: 15000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-08', nombre: 'HIIT 30', descripcion: 'Entrenamiento de alta intensidad por intervalos, en sesiones de 30 minutos.', categoria: 'cat-1', imagenes: [], precio: 4000, disponible: false, activa: true, destacada: false },
  { _id: 'pub-09', nombre: 'Funcional', descripcion: 'Circuitos de entrenamiento funcional con elementos: kettlebells, cuerdas y cajones.', categoria: 'cat-2', imagenes: [IMG], precio: 4200, disponible: true, activa: true, destacada: true },
  { _id: 'pub-10', nombre: 'Yoga', descripcion: 'Clases de yoga para todos los niveles, con foco en movilidad y respiración.', categoria: 'cat-2', imagenes: [], precio: 4000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-11', nombre: 'Pilates Mat', descripcion: 'Pilates en colchoneta para fortalecer el core y mejorar la postura.', categoria: 'cat-2', imagenes: [], precio: 4500, disponible: true, activa: true, destacada: false },
  { _id: 'pub-12', nombre: 'Zumba', descripcion: 'Clase de baile aeróbico en grupo, ideal para empezar a moverse.', categoria: 'cat-2', imagenes: [], precio: 3800, disponible: true, activa: true, destacada: false },
  { _id: 'pub-13', nombre: 'Boxeo recreativo', descripcion: 'Técnica de boxeo sin contacto, trabajo de bolsa y acondicionamiento.', categoria: 'cat-2', imagenes: [], precio: 5000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-14', nombre: 'CrossTraining', descripcion: 'Entrenamiento cruzado de fuerza y resistencia en grupos reducidos.', categoria: 'cat-2', imagenes: [], precio: 5500, disponible: false, activa: false, destacada: false },
  { _id: 'pub-15', nombre: 'Personal Training - 1 sesión', descripcion: 'Una sesión individual con entrenador personal, coordinada según tu disponibilidad.', categoria: 'cat-3', imagenes: [], precio: 9000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-16', nombre: 'Personal Training - Pack 8 sesiones', descripcion: 'Ocho sesiones individuales con seguimiento de progreso y plan mensual.', categoria: 'cat-3', imagenes: [IMG], precio: 64000, disponible: true, activa: true, destacada: true },
  { _id: 'pub-17', nombre: 'Evaluación física inicial', descripcion: 'Medición de composición corporal, fuerza y resistencia para definir el punto de partida.', categoria: 'cat-3', imagenes: [], disponible: true, activa: true, destacada: false },
  { _id: 'pub-18', nombre: 'Consulta nutricional', descripcion: 'Consulta con nutricionista deportivo y plan alimentario personalizado.', categoria: 'cat-5', imagenes: [], precio: 11000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-19', nombre: 'Proteína Whey 1 kg', descripcion: 'Suplemento proteico en polvo, disponible en sabores chocolate y vainilla.', categoria: 'cat-5', imagenes: [], precio: 32000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-20', nombre: 'Creatina monohidrato 300 g', descripcion: 'Creatina micronizada de pureza farmacéutica, envase de 300 gramos.', categoria: 'cat-5', imagenes: [], precio: 18500, disponible: false, activa: false, destacada: false },
]

// Lecturas: devuelven copias para que nadie mute el store por accidente.
export const leerCategorias = () => categorias.map((c) => ({ ...c }))

export const leerPublicaciones = () => publicaciones.map((p) => ({ ...p }))

// Escrituras: reemplazan el array completo, como haría un reducer.
export const escribirCategorias = (siguiente) => {
  categorias = siguiente
}

export const escribirPublicaciones = (siguiente) => {
  publicaciones = siguiente
}

// Equivale al countDocuments({ categoria: id }) de category.service.js.
export const contarPublicacionesDeCategoria = (idCategoria) =>
  publicaciones.filter(
    (publicacion) => publicacion.categoria === idCategoria,
  ).length
