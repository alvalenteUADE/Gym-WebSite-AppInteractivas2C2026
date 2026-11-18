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
const img = (id) =>
  `https://images.unsplash.com/${id}?w=800&q=80&fm=webp&fit=crop`

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
  { _id: 'pub-01', nombre: 'Abono mensual sala de musculación', descripcion: 'Acceso ilimitado a la sala de musculación de lunes a domingo. Incluye rutina inicial armada por un instructor.', categoria: 'cat-4', imagenes: [img('photo-1534438327276-14e5300c3a48'), img('photo-1517836357463-d25dfeac3438')], precio: 25000, disponible: true, activa: true, destacada: true },
  { _id: 'pub-02', nombre: 'Abono trimestral sala de musculación', descripcion: 'Tres meses de acceso ilimitado con un descuento sobre el valor mensual.', categoria: 'cat-4', imagenes: [img('photo-1517836357463-d25dfeac3438')], precio: 63750, disponible: true, activa: true, destacada: false },
  { _id: 'pub-03', nombre: 'Pase diario', descripcion: 'Acceso por un día a la sala de musculación y al sector de cardio.', categoria: 'cat-4', imagenes: [img('photo-1571902943202-507ec2618e8f')], precio: 3500, disponible: true, activa: true, destacada: false },
  { _id: 'pub-04', nombre: 'Rutina personalizada de fuerza', descripcion: 'Un instructor armá una rutina adaptada a tu nivel y objetivos, con seguimiento mensual.', categoria: 'cat-4', imagenes: [img('photo-1581009146145-b5ef050c2e1e')], precio: 12000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-05', nombre: 'Clase de Spinning', descripcion: 'Clase grupal de ciclismo indoor de 45 minutos con música y entrenador.', categoria: 'cat-1', imagenes: [img('photo-1571019614242-c5c5dee9f50b'), img('photo-1540497077202-7c8a3999166f')], precio: 4500, disponible: true, activa: true, destacada: true },
  { _id: 'pub-06', nombre: 'Sector cardio: cintas y elípticos', descripcion: 'Uso libre del sector de cardio incluido en cualquier abono vigente.', categoria: 'cat-1', imagenes: [img('photo-1540497077202-7c8a3999166f')], disponible: true, activa: true, destacada: false },
  { _id: 'pub-07', nombre: 'Running Team', descripcion: 'Entrenamiento grupal de running al aire libre, dos veces por semana.', categoria: 'cat-1', imagenes: [img('photo-1476480862126-209bfaa8edc8')], precio: 15000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-08', nombre: 'HIIT 30', descripcion: 'Entrenamiento de alta intensidad por intervalos, en sesiones de 30 minutos.', categoria: 'cat-1', imagenes: [img('photo-1599058917212-d750089bc07e')], precio: 4000, disponible: false, activa: true, destacada: false },
  { _id: 'pub-09', nombre: 'Funcional', descripcion: 'Circuitos de entrenamiento funcional con elementos: kettlebells, cuerdas y cajones.', categoria: 'cat-2', imagenes: [img('photo-1518611012118-696072aa579a'), img('photo-1544367567-0f2fcb009e0b')], precio: 4200, disponible: true, activa: true, destacada: true },
  { _id: 'pub-10', nombre: 'Yoga', descripcion: 'Clases de yoga para todos los niveles, con foco en movilidad y respiración.', categoria: 'cat-2', imagenes: [img('photo-1544367567-0f2fcb009e0b')], precio: 4000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-11', nombre: 'Pilates Mat', descripcion: 'Pilates en colchoneta para fortalecer el core y mejorar la postura.', categoria: 'cat-2', imagenes: [img('photo-1518310383802-640c2de311b2')], precio: 4500, disponible: true, activa: true, destacada: false },
  { _id: 'pub-12', nombre: 'Zumba', descripcion: 'Clase de baile aeróbico en grupo, ideal para empezar a moverse.', categoria: 'cat-2', imagenes: [img('photo-1524594152303-9fd13543fe6e')], precio: 3800, disponible: true, activa: true, destacada: false },
  { _id: 'pub-13', nombre: 'Boxeo recreativo', descripcion: 'Técnica de boxeo sin contacto, trabajo de bolsa y acondicionamiento.', categoria: 'cat-2', imagenes: [img('photo-1549719386-74dfcbf7dbed')], precio: 5000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-14', nombre: 'CrossTraining', descripcion: 'Entrenamiento cruzado de fuerza y resistencia en grupos reducidos.', categoria: 'cat-2', imagenes: [img('photo-1526506118085-60ce8714f8c5')], precio: 5500, disponible: false, activa: false, destacada: false },
  { _id: 'pub-15', nombre: 'Personal Training - 1 sesión', descripcion: 'Una sesión individual con entrenador personal, coordinada según tu disponibilidad.', categoria: 'cat-3', imagenes: [img('photo-1571731956672-f2b94d7dd0cb')], precio: 9000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-16', nombre: 'Personal Training - Pack 8 sesiones', descripcion: 'Ocho sesiones individuales con seguimiento de progreso y plan mensual.', categoria: 'cat-3', imagenes: [img('photo-1434682881908-b43d0467b798'), img('photo-1576678927484-cc907957088c')], precio: 64000, disponible: true, activa: true, destacada: true },
  { _id: 'pub-17', nombre: 'Evaluación física inicial', descripcion: 'Medición de composición corporal, fuerza y resistencia para definir el punto de partida.', categoria: 'cat-3', imagenes: [img('photo-1576678927484-cc907957088c')], disponible: true, activa: true, destacada: false },
  { _id: 'pub-18', nombre: 'Consulta nutricional', descripcion: 'Consulta con nutricionista deportivo y plan alimentario personalizado.', categoria: 'cat-5', imagenes: [img('photo-1490645935967-10de6ba17061')], precio: 11000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-19', nombre: 'Proteína Whey 1 kg', descripcion: 'Suplemento proteico en polvo, disponible en sabores chocolate y vainilla.', categoria: 'cat-5', imagenes: [img('photo-1593095948071-474c5cc2989d')], precio: 32000, disponible: true, activa: true, destacada: false },
  { _id: 'pub-20', nombre: 'Creatina monohidrato 300 g', descripcion: 'Creatina micronizada de pureza farmacéutica, envase de 300 gramos.', categoria: 'cat-5', imagenes: [img('photo-1579722821273-0f6c7d44362f')], precio: 18500, disponible: false, activa: false, destacada: false },
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
