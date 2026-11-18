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

export async function contarClientes() {
  const response = await fetch(`${API_URL}/user/clientes/count`, {
    headers: cabecerasAutenticadas(),
  })

  const data = await procesarRespuesta(response)

  return data.data?.total ?? 0
}
