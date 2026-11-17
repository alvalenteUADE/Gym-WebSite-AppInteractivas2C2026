// ============================================================
// MOCK DE LA API DE CONSULTAS
// ------------------------------------------------------------
// Simula los endpoints del backend con el MISMO contrato:
// mismas funciones, mismos datos de salida y los mismos
// mensajes de error. Al integrar, sólo hay que reemplazar el
// cuerpo de cada función por su fetch, sin tocar el hook ni la
// pantalla.
//
//   listarConsultas()            -> GET    /api/consulta
//   crearConsulta(datos)         -> POST   /api/consulta/create
//   modificarEstado(id, estado)  -> PUT    /api/consulta/:id/estado
//   eliminarConsulta(id)         -> DELETE /api/consulta/:id
// ============================================================

import { demorar, escribirConsultas, leerConsultas } from './db.mock'

// Mensajes copiados textuales de consulta.service.js / controller.
export const ERRORES = {
  NO_ENCONTRADA: 'No se encontró la consulta con ese ID.',
  ESTADO_INVALIDO:
    'Estado inválido. Los estados permitidos son: Pendiente, Leída, Respondida.',
}

export const ESTADOS = ['Pendiente', 'Leída', 'Respondida']

export const ESTADO_POR_DEFECTO = 'Pendiente'

export async function listarConsultas() {
  await demorar()

  // Mismo orden que el .sort({ createdAt: -1 }) del servicio.
  return leerConsultas().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
}

export async function crearConsulta({ nombre, correo, telefono, asunto, mensaje }) {
  await demorar()

  const ahora = new Date().toISOString()

  const nueva = {
    _id: crypto.randomUUID(),
    nombre,
    correo: correo.toLowerCase().trim(),
    telefono: telefono ?? '',
    asunto,
    mensaje,
    estado: ESTADO_POR_DEFECTO,
    createdAt: ahora,
    updatedAt: ahora,
  }

  escribirConsultas([...leerConsultas(), nueva])

  return { ...nueva }
}

export async function modificarEstado(id, estado) {
  await demorar()

  if (!ESTADOS.includes(estado)) {
    throw new Error(ERRORES.ESTADO_INVALIDO)
  }

  const actual = leerConsultas().find((consulta) => consulta._id === id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  const modificada = {
    ...actual,
    estado,
    updatedAt: new Date().toISOString(),
  }

  escribirConsultas(
    leerConsultas().map((consulta) =>
      consulta._id === id ? modificada : consulta,
    ),
  )

  return { ...modificada }
}

export async function eliminarConsulta(id) {
  await demorar()

  const actual = leerConsultas().find((consulta) => consulta._id === id)

  if (!actual) {
    throw new Error(ERRORES.NO_ENCONTRADA)
  }

  escribirConsultas(
    leerConsultas().filter((consulta) => consulta._id !== id),
  )

  return { ...actual }
}
