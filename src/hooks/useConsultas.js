import { useCallback, useEffect, useState } from 'react'
import * as api from '../mocks/consultas.mock'

const MSG_ERROR_GENERICO = 'Ocurrió un error inesperado.'

export function useConsultas() {
  const [consultas, setConsultas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    let activo = true

    api
      .listarConsultas()
      .then((lista) => {
        if (activo) {
          setConsultas(lista)
        }
      })
      .catch((error) => {
        if (activo) {
          setErrorCarga(
            error.message || 'No se pudieron cargar las consultas.',
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
      setConsultas(await api.listarConsultas())
    } catch (error) {
      setErrorCarga(error.message || 'No se pudieron cargar las consultas.')
    } finally {
      setCargando(false)
    }
  }, [])

  const ejecutar = useCallback(async (operacion) => {
    setGuardando(true)

    try {
      const resultado = await operacion()
      setConsultas(await api.listarConsultas())
      return { ok: true, data: resultado }
    } catch (error) {
      return { ok: false, error: error.message || MSG_ERROR_GENERICO }
    } finally {
      setGuardando(false)
    }
  }, [])

  const modificarEstado = useCallback(
    (id, estado) => ejecutar(() => api.modificarEstado(id, estado)),
    [ejecutar],
  )

  const eliminar = useCallback(
    (id) => ejecutar(() => api.eliminarConsulta(id)),
    [ejecutar],
  )

  return {
    consultas,
    cargando,
    errorCarga,
    guardando,
    recargar,
    modificarEstado,
    eliminar,
  }
}

export default useConsultas
