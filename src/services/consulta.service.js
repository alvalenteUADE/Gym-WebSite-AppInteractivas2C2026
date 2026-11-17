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

export async function crearConsulta(datos) {
  const response = await fetch(`${API_URL}/consulta/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function listarConsultas() {
  const response = await fetch(`${API_URL}/consulta`, {
    method: 'GET',
    headers: cabecerasAutenticadas(),
  })

  const data = await procesarRespuesta(response)

  return data.data ?? []
}

export async function modificarEstado(id, estado) {
  const response = await fetch(`${API_URL}/consulta/${id}/estado`, {
    method: 'PUT',
    headers: cabecerasAutenticadas(),
    body: JSON.stringify({ estado }),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function eliminarConsulta(id) {
  const response = await fetch(`${API_URL}/consulta/${id}`, {
    method: 'DELETE',
    headers: cabecerasAutenticadas(),
  })

  const data = await procesarRespuesta(response)

  return data
}
