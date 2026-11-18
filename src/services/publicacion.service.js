const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const obtenerToken = () => localStorage.getItem('token')

const cabecerasAutenticadas = () => {
  const token = obtenerToken()

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const procesarRespuesta = async (response) => {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error al procesar la solicitud.')
  }

  return data
}

const normalizar = ({
  nombre,
  descripcion,
  categoria,
  imagenes,
  precio,
  disponible,
  destacada,
}) => {
  const datos = {}

  if (nombre !== undefined) datos.nombre = nombre
  if (descripcion !== undefined) datos.descripcion = descripcion
  if (categoria !== undefined) datos.categoria = categoria
  if (imagenes !== undefined) datos.imagenes = imagenes
  if (disponible !== undefined) datos.disponible = disponible
  if (destacada !== undefined) datos.destacada = destacada

  if (precio !== undefined && precio !== null && precio !== '') {
    datos.precio = Number(precio)
  }

  return datos
}

export async function listarPublicaciones() {
  const response = await fetch(`${API_URL}/publicacion`, {
    method: 'GET',
  })

  const data = await procesarRespuesta(response)

  return (data.data ?? []).map((publicacion) => ({
    ...publicacion,
    imagenes: publicacion.imagenes ?? [],
  }))
}

export async function obtenerPublicacion(id) {
  const response = await fetch(`${API_URL}/publicacion/${id}`, {
    method: 'GET',
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function crearPublicacion(datos) {
  const response = await fetch(`${API_URL}/publicacion/create`, {
    method: 'POST',
    headers: cabecerasAutenticadas(),
    body: JSON.stringify(normalizar(datos)),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function modificarPublicacion(id, datos) {
  const response = await fetch(`${API_URL}/publicacion/${id}`, {
    method: 'PUT',
    headers: cabecerasAutenticadas(),
    body: JSON.stringify(normalizar(datos)),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function cambiarEstado(id, activa) {
  const response = await fetch(`${API_URL}/publicacion/${id}/estado`, {
    method: 'PATCH',
    headers: cabecerasAutenticadas(),
    body: JSON.stringify({ activa }),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function eliminarPublicacion(id) {
  const response = await fetch(`${API_URL}/publicacion/${id}`, {
    method: 'DELETE',
    headers: cabecerasAutenticadas(),
  })

  const data = await procesarRespuesta(response)

  return data.data
}
