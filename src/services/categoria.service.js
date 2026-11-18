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

const contarPorCategoria = (publicaciones) => {
  const conteo = {}

  publicaciones.forEach((publicacion) => {
    const id = publicacion.categoria?._id ?? publicacion.categoria

    if (id) {
      conteo[id] = (conteo[id] ?? 0) + 1
    }
  })

  return conteo
}

export async function listarCategorias() {
  const [respuestaCategorias, respuestaPublicaciones] = await Promise.all([
    fetch(`${API_URL}/category`, { method: 'GET' }),
    fetch(`${API_URL}/publicacion`, { method: 'GET' }),
  ])

  const datosCategorias = await procesarRespuesta(respuestaCategorias)
  const categorias = datosCategorias.data ?? []

  let conteo = {}

  if (respuestaPublicaciones.ok) {
    const datosPublicaciones = await respuestaPublicaciones
      .json()
      .catch(() => ({}))
    conteo = contarPorCategoria(datosPublicaciones.data ?? [])
  }

  return categorias.map((categoria) => ({
    ...categoria,
    publicaciones: conteo[categoria._id] ?? 0,
  }))
}

export async function crearCategoria({ nombre }) {
  const response = await fetch(`${API_URL}/category/create`, {
    method: 'POST',
    headers: cabecerasAutenticadas(),
    body: JSON.stringify({ nombre }),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function modificarCategoria(id, { nombre }) {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: 'PUT',
    headers: cabecerasAutenticadas(),
    body: JSON.stringify({ nombre }),
  })

  const data = await procesarRespuesta(response)

  return data.data
}

export async function eliminarCategoria(id) {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: 'DELETE',
    headers: cabecerasAutenticadas(),
  })

  const data = await procesarRespuesta(response)

  return data.data
}
