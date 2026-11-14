import { useCallback, useEffect, useState } from 'react'
import * as api from '../mocks/categorias.mock'

const MSG_ERROR_GENERICO = 'Ocurrió un error inesperado.'


export function useCategorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [guardando, setGuardando] = useState(false)


  useEffect(() => {
    let activo = true

    api
      .listarCategorias()
      .then((lista) => {
        if (activo) {
          setCategorias(lista)
        }
      })
      .catch((error) => {
        if (activo) {
          setErrorCarga(error.message || 'No se pudieron cargar las categorías.')
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
      setCategorias(await api.listarCategorias())
    } catch (error) {
      setErrorCarga(error.message || 'No se pudieron cargar las categorías.')
    } finally {
      setCargando(false)
    }
  }, [])


  const ejecutar = useCallback(async (operacion) => {
    setGuardando(true)

    try {
      const resultado = await operacion()
      setCategorias(await api.listarCategorias())
      return { ok: true, data: resultado }
    } catch (error) {
      return { ok: false, error: error.message || MSG_ERROR_GENERICO }
    } finally {
      setGuardando(false)
    }
  }, [])

  const crear = useCallback(
    (nombre) => ejecutar(() => api.crearCategoria({ nombre })),
    [ejecutar],
  )

  const modificar = useCallback(
    (id, nombre) => ejecutar(() => api.modificarCategoria(id, { nombre })),
    [ejecutar],
  )

  const eliminar = useCallback(
    (id) => ejecutar(() => api.eliminarCategoria(id)),
    [ejecutar],
  )

  return {
    categorias,
    cargando,
    errorCarga,
    guardando,
    recargar,
    crear,
    modificar,
    eliminar,
  }
}

export default useCategorias
