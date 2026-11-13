// ============================================================
// MOCK DE LA API DE CATEGORÍAS
// ------------------------------------------------------------
// Simula los endpoints del backend con el MISMO contrato: mismas
// funciones, mismos datos de salida y los mismos mensajes de error.
// Así, en la etapa de integración, sólo hay que reemplazar el cuerpo
// de cada función por su fetch, sin tocar los componentes ni el hook.
//
//   listarCategorias()        -> GET    /api/category
//   crearCategoria(datos)     -> POST   /api/category/create
//   modificarCategoria(id, d) -> PUT    /api/category/:id
//   eliminarCategoria(id)     -> DELETE /api/category/:id
//
// NOTA: el campo `publicaciones` NO existe en el modelo del backend.
// Se calcula acá contando las publicaciones del store para poder
// mostrar en la UI la regla que impide borrar una categoría en uso.
// Al integrar, ese número sale de contar GET /api/publicacion.
// ============================================================

import {
  contarPublicacionesDeCategoria,
  demorar,
  escribirCategorias,
  leerCategorias,
} from './db.mock'

// Mensajes de error, copiados textuales del backend para que la UI
// muestre lo mismo antes y después de integrar.
export const ERRORES = {
  DUPLICADA: 'Ya existe una categoría con ese nombre.',
  EN_USO: 'No se puede eliminar la categoría porque tiene publicaciones asociadas.',
  NO_ENCONTRADA: 'No se encontró la categoría con ese ID',
}

// El backend normaliza con trim() antes de comparar y guardar.
const normalizar = (nombre) => nombre.trim()

// La comparación de duplicados del backend es sensible a mayúsculas
// (findOne con el string exacto). Se replica ese mismo criterio.
const existeNombre = (nombre, idExcluido = null) =>
  leerCategorias().some(
    (categoria) => categoria.nombre === nombre && categoria._id !== idExcluido,
  )

// Agrega el conteo de publicaciones y ordena alfabéticamente,
// igual que el .sort({ nombre: 1 }) del servicio.
const conUso = (categoria) => ({
  ...categoria,
  publicaciones: contarPublicacionesDeCategoria(categoria._id),
})

export async function listarCategorias() {
  await demorar()

  return leerCategorias()
    .map(conUso)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

export async function crearCategoria({ nombre }) {
  await demorar()

  const nombreNormalizado = normalizar(nombre)

  if (existeNombre(nombreNormalizado)) {
    throw new Error(ERRORES.DUPLICADA)
  }

  const nueva = { _id: crypto.randomUUID(), nombre: nombreNormalizado }

  escribirCategorias([...leerCategorias(), nueva])

  return conUso(nueva)
}

export async function modificarCategoria(id, { nombre }) {
  await demorar()

  const actual = leerCategorias().find((categoria) => categoria._id === id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  const nombreNormalizado = normalizar(nombre)

  if (existeNombre(nombreNormalizado, id)) {
    throw new Error(ERRORES.DUPLICADA)
  }

  const modificada = { ...actual, nombre: nombreNormalizado }

  escribirCategorias(
    leerCategorias().map((categoria) =>
      categoria._id === id ? modificada : categoria,
    ),
  )

  return conUso(modificada)
}

export async function eliminarCategoria(id) {
  await demorar()

  const actual = leerCategorias().find((categoria) => categoria._id === id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  // Misma guarda que category.service.js: no se puede borrar una
  // categoría que tenga publicaciones asociadas.
  if (contarPublicacionesDeCategoria(id) > 0) {
    throw new Error(ERRORES.EN_USO)
  }

  escribirCategorias(
    leerCategorias().filter((categoria) => categoria._id !== id),
  )

  return actual
}
