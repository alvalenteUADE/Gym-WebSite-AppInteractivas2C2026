import { useEffect, useState } from 'react'
import { contarClientes } from '../services/usuario.service'

export function useClientes() {
  const [total, setTotal] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')

  useEffect(() => {
    let activo = true

    contarClientes()
      .then((cantidad) => {
        if (activo) {
          setTotal(cantidad)
        }
      })
      .catch((error) => {
        if (activo) {
          setErrorCarga(error.message || 'No se pudo obtener la cantidad de clientes.')
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

  return { total, cargando, errorCarga }
}

export default useClientes
