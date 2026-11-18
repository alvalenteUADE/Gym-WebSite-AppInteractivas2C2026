import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MAX_INTENTOS = 40

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    let intentos = 0
    let frame = null

    const buscarYScrollear = () => {
      const elemento = document.getElementById(id)

      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (intentos < MAX_INTENTOS) {
        intentos += 1
        frame = requestAnimationFrame(buscarYScrollear)
      }
    }

    frame = requestAnimationFrame(buscarYScrollear)

    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
      }
    }
  }, [pathname, hash])

  return null
}

export default ScrollToHash
