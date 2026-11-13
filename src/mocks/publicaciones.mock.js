// ============================================================
// MOCK DE LA API DE PUBLICACIONES
// ------------------------------------------------------------
// Mismo criterio que categorias.mock.js: replica el contrato del
// backend para que la integración sea reemplazar cuerpos de función.
//
//   listarPublicaciones()      -> GET    /api/publicacion
//   obtenerPublicacion(id)     -> GET    /api/publicacion/:id
//   crearPublicacion(datos)    -> POST   /api/publicacion/create
//   modificarPublicacion(id,d) -> PUT    /api/publicacion/:id
//   cambiarEstado(id, activa)  -> PATCH  /api/publicacion/:id/estado
//   eliminarPublicacion(id)    -> DELETE /api/publicacion/:id
//
// Igual que el backend, listarPublicaciones() devuelve TODAS,
// incluidas las desactivadas, y la categoría viene poblada con
// su nombre (el .populate('categoria', 'nombre') del servicio).
// ============================================================

import {
  demorar,
  escribirPublicaciones,
  leerCategorias,
  leerPublicaciones,
} from './db.mock'

export const ERRORES = {
  NO_ENCONTRADA: 'No se encontró la publicación con ese ID',
  CATEGORIA_NO_ENCONTRADA: 'No se encontró la categoría indicada',
}

// Reproduce el .populate('categoria', 'nombre'): la categoría pasa
// de ser un id a ser un objeto { _id, nombre }.
const poblarCategoria = (publicacion) => {
  const categoria = leerCategorias().find(
    (item) => item._id === publicacion.categoria,
  )

  return {
    ...publicacion,
    categoria: categoria
      ? { _id: categoria._id, nombre: categoria.nombre }
      : null,
  }
}

const validarCategoria = (idCategoria) => {
  const existe = leerCategorias().some((item) => item._id === idCategoria)

  if (!existe) {
    throw new Error(ERRORES.CATEGORIA_NO_ENCONTRADA)
  }
}

const buscar = (id) =>
  leerPublicaciones().find((publicacion) => publicacion._id === id)

// Sólo se persisten los campos del modelo, como hace el servicio
// con su lista blanca antes del $set.
const camposPermitidos = ({
  nombre,
  descripcion,
  categoria,
  imagenes,
  precio,
  disponible,
  destacada,
}) => {
  const datos = {}

  if (nombre !== undefined) datos.nombre = nombre.trim()
  if (descripcion !== undefined) datos.descripcion = descripcion
  if (categoria !== undefined) datos.categoria = categoria
  if (imagenes !== undefined) datos.imagenes = imagenes
  if (disponible !== undefined) datos.disponible = disponible
  if (destacada !== undefined) datos.destacada = destacada

  // El precio es opcional: null o '' lo dejan sin precio publicado.
  if (precio !== undefined) {
    datos.precio = precio === null || precio === '' ? undefined : Number(precio)
  }

  return datos
}

export async function listarPublicaciones() {
  await demorar()

  // El backend ordena por createdAt descendente. Como el mock no
  // maneja fechas, se usa el orden inverso de inserción, que es
  // equivalente: lo último creado aparece primero.
  return leerPublicaciones().reverse().map(poblarCategoria)
}

export async function obtenerPublicacion(id) {
  await demorar()

  const publicacion = buscar(id)

  if (!publicacion) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  return poblarCategoria(publicacion)
}

export async function crearPublicacion(datos) {
  await demorar()

  validarCategoria(datos.categoria)

  const nueva = {
    _id: crypto.randomUUID(),
    imagenes: [],
    disponible: true,
    activa: true,
    destacada: false,
    ...camposPermitidos(datos),
  }

  escribirPublicaciones([...leerPublicaciones(), nueva])

  return poblarCategoria(nueva)
}

export async function modificarPublicacion(id, datos) {
  await demorar()

  const actual = buscar(id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  if (datos.categoria !== undefined) {
    validarCategoria(datos.categoria)
  }

  const modificada = { ...actual, ...camposPermitidos(datos) }

  escribirPublicaciones(
    leerPublicaciones().map((publicacion) =>
      publicacion._id === id ? modificada : publicacion,
    ),
  )

  return poblarCategoria(modificada)
}

// Baja lógica: activa o desactiva sin borrar el registro.
export async function cambiarEstado(id, activa) {
  await demorar()

  const actual = buscar(id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  const modificada = { ...actual, activa }

  escribirPublicaciones(
    leerPublicaciones().map((publicacion) =>
      publicacion._id === id ? modificada : publicacion,
    ),
  )

  return poblarCategoria(modificada)
}

// Borrado físico.
export async function eliminarPublicacion(id) {
  await demorar()

  const actual = buscar(id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  escribirPublicaciones(
    leerPublicaciones().filter((publicacion) => publicacion._id !== id),
  )

  return actual
}
