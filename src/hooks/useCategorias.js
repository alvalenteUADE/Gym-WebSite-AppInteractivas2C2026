import { useCallback, useEffect, useState } from 'react'
import * as api from '../mocks/categorias.mock'

const MSG_ERROR_GENERICO = 'Ocurrió un error inesperado.'

/**
 * Centraliza el estado y las operaciones de categorías.
 *
 * El componente de pantalla sólo se ocupa de mostrar datos y disparar
 * acciones; toda la coordinación con la API (carga, errores, refresco)
 * vive acá. Al integrar el backend real sólo cambia el import de arriba.
 *
 * Las operaciones devuelven { ok, error } en lugar de lanzar excepciones,
 * para que la pantalla decida qué mostrar sin envolver todo en try/catch.
 */
export function useCategorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [guardando, setGuardando] = useState(false)

  // Carga inicial. El flag `activo` evita actualizar el estado si el
  // componente se desmonta antes de que responda la API: sin esto, en
  // StrictMode (que monta dos veces en desarrollo) la respuesta de la
  // primera pasada llegaría a un componente que ya no está en pantalla.
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

  // Refresco manual, disparado por el usuario (no desde un efecto).
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

  // Envuelve una operación de escritura: marca el estado de guardado,
  // refresca la lista si salió bien y traduce el error a un string.
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
