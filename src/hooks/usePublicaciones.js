import { useCallback, useEffect, useState } from 'react'
import * as api from '../mocks/publicaciones.mock'

const MSG_ERROR_GENERICO = 'Ocurrió un error inesperado.'

/**
 * Centraliza el estado y las operaciones de publicaciones.
 *
 * Mismo contrato que useCategorias: las operaciones devuelven
 * { ok, error } en lugar de lanzar, y toda la coordinación con la
 * API queda acá para que la pantalla sólo muestre y dispare acciones.
 */
export function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [guardando, setGuardando] = useState(false)

  // Carga inicial. El flag `activo` evita escribir estado si el
  // componente se desmontó antes de que responda la API.
  useEffect(() => {
    let activo = true

    api
      .listarPublicaciones()
      .then((lista) => {
        if (activo) {
          setPublicaciones(lista)
        }
      })
      .catch((error) => {
        if (activo) {
          setErrorCarga(
            error.message || 'No se pudieron cargar las publicaciones.',
          )
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [])

  const recargar = useCallback(async () => {
    setCargando(true)
    setErrorCarga('')

    try {
      setPublicaciones(await api.listarPublicaciones())
    } catch (error) {
      setErrorCarga(error.message || 'No se pudieron cargar las publicaciones.')
    } finally {
      setCargando(false)
    }
  }, [])

  const ejecutar = useCallback(async (operacion) => {
    setGuardando(true)

    try {
      const resultado = await operacion()
      setPublicaciones(await api.listarPublicaciones())
      return { ok: true, data: resultado }
    } catch (error) {
      return { ok: false, error: error.message || MSG_ERROR_GENERICO }
    } finally {
      setGuardando(false)
    }
  }, [])

  const crear = useCallback(
    (datos) => ejecutar(() => api.crearPublicacion(datos)),
    [ejecutar],
  )

  const modificar = useCallback(
    (id, datos) => ejecutar(() => api.modificarPublicacion(id, datos)),
    [ejecutar],
  )

  // Baja lógica (PATCH /:id/estado), distinta del borrado físico.
  const cambiarEstado = useCallback(
    (id, activa) => ejecutar(() => api.cambiarEstado(id, activa)),
    [ejecutar],
  )

  const eliminar = useCallback(
    (id) => ejecutar(() => api.eliminarPublicacion(id)),
    [ejecutar],
  )

  return {
    publicaciones,
    cargando,
    errorCarga,
    guardando,
    recargar,
    crear,
    modificar,
    cambiarEstado,
    eliminar,
  }
}

export default usePublicaciones
