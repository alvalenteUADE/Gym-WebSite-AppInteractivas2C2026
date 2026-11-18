import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import MuiButton from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Section from '../../components/layout/Section'
import PublicacionCard from '../../components/ui/PublicacionCard'
import { useCategorias } from '../../hooks/useCategorias'
import { usePublicaciones } from '../../hooks/usePublicaciones'
import '../../styles/pages/Publicaciones.css'

const ORDENES = [
  { valor: 'destacadas', label: 'Destacadas primero' },
  { valor: 'nombre', label: 'Nombre (A-Z)' },
  { valor: 'precio-asc', label: 'Menor precio' },
  { valor: 'precio-desc', label: 'Mayor precio' },
]

const SIN_PRECIO = Number.POSITIVE_INFINITY

const comparadores = {
  destacadas: (a, b) =>
    Number(b.destacada) - Number(a.destacada) ||
    a.nombre.localeCompare(b.nombre, 'es'),
  nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
  'precio-asc': (a, b) => (a.precio ?? SIN_PRECIO) - (b.precio ?? SIN_PRECIO),
  'precio-desc': (a, b) => (b.precio ?? -1) - (a.precio ?? -1),
}

function Publicaciones() {
  const { publicaciones, cargando, errorCarga } = usePublicaciones()
  const { categorias } = useCategorias()

  const [params, setParams] = useSearchParams()

  const busqueda = params.get('q') ?? ''
  const categoria = params.get('categoria') ?? 'todas'
  const orden = params.get('orden') ?? 'destacadas'
  const soloDisponibles = params.get('disponibles') === '1'

  const actualizar = (clave, valor, porDefecto) => {
    const siguiente = new URLSearchParams(params)

    if (!valor || valor === porDefecto) {
      siguiente.delete(clave)
    } else {
      siguiente.set(clave, valor)
    }

    setParams(siguiente, { replace: true })
  }

  const limpiarFiltros = () => setParams(new URLSearchParams(), { replace: true })

  const activas = useMemo(
    () => publicaciones.filter((item) => item.activa),
    [publicaciones],
  )

  const porCategoria = useMemo(() => {
    const conteo = {}

    activas.forEach((item) => {
      const id = item.categoria?._id

      if (id) {
        conteo[id] = (conteo[id] ?? 0) + 1
      }
    })

    return conteo
  }, [activas])

  const resultados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    const filtradas = activas.filter((item) => {
      const coincideTexto =
        !termino ||
        item.nombre.toLowerCase().includes(termino) ||
        item.descripcion.toLowerCase().includes(termino) ||
        (item.categoria?.nombre ?? '').toLowerCase().includes(termino)

      const coincideCategoria =
        categoria === 'todas' || item.categoria?._id === categoria

      const coincideDisponible = !soloDisponibles || item.disponible

      return coincideTexto && coincideCategoria && coincideDisponible
    })

    return filtradas.sort(comparadores[orden] ?? comparadores.destacadas)
  }, [activas, busqueda, categoria, orden, soloDisponibles])

  const hayFiltros =
    Boolean(busqueda.trim()) ||
    categoria !== 'todas' ||
    orden !== 'destacadas' ||
    soloDisponibles

  const categoriasConPublicaciones = categorias.filter(
    (item) => porCategoria[item._id] > 0,
  )

  return (
    <Section
      id="publicaciones"
      eyebrow="Nuestras propuestas"
      title="Productos y servicios"
      description="Abonos, clases y asesoramiento para que encuentres la forma de entrenar que mejor te funcione."
    >
      <Box className="pubs__filtros" role="search">
        <TextField
          className="pubs__busqueda"
          label="Buscar"
          placeholder="Spinning, abono mensual, nutrición…"
          value={busqueda}
          onChange={(event) => actualizar('q', event.target.value, '')}
          type="search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                  ⌕
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          className="pubs__orden"
          label="Ordenar por"
          value={orden}
          onChange={(event) => actualizar('orden', event.target.value, 'destacadas')}
        >
          {ORDENES.map((item) => (
            <MenuItem key={item.valor} value={item.valor}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        className="pubs__categorias"
        role="group"
        aria-label="Filtrar por categoría"
      >
        <Chip
          label={`Todas (${activas.length})`}
          onClick={() => actualizar('categoria', 'todas', 'todas')}
          color={categoria === 'todas' ? 'primary' : 'default'}
          variant={categoria === 'todas' ? 'filled' : 'outlined'}
          aria-pressed={categoria === 'todas'}
        />

        {categoriasConPublicaciones.map((item) => (
          <Chip
            key={item._id}
            label={`${item.nombre} (${porCategoria[item._id]})`}
            onClick={() => actualizar('categoria', item._id, 'todas')}
            color={categoria === item._id ? 'primary' : 'default'}
            variant={categoria === item._id ? 'filled' : 'outlined'}
            aria-pressed={categoria === item._id}
          />
        ))}

        <Chip
          label="Solo con cupo"
          onClick={() => actualizar('disponibles', soloDisponibles ? '' : '1', '')}
          color={soloDisponibles ? 'primary' : 'default'}
          variant={soloDisponibles ? 'filled' : 'outlined'}
          aria-pressed={soloDisponibles}
        />
      </Box>

      {errorCarga && (
        <Alert severity="error" className="pubs__alerta">
          {errorCarga}
        </Alert>
      )}

      {cargando ? (
        <Box className="pubs__grid" aria-busy="true" aria-label="Cargando publicaciones">
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i} className="pubs__skeleton">
              <Skeleton variant="rectangular" className="pubs__skeleton-media" />
              <Skeleton width="40%" />
              <Skeleton width="85%" height={28} />
              <Skeleton width="100%" />
              <Skeleton width="60%" />
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Box className="pubs__resumen" role="status" aria-live="polite">
            <Typography component="p" className="pubs__contador">
              {resultados.length === activas.length
                ? `${activas.length} publicaciones`
                : `${resultados.length} de ${activas.length} publicaciones`}
            </Typography>

            {hayFiltros && (
              <MuiButton variant="text" size="small" onClick={limpiarFiltros}>
                Limpiar filtros
              </MuiButton>
            )}
          </Box>

          {resultados.length > 0 ? (
            <Box className="pubs__grid">
              {resultados.map((publicacion) => (
                <PublicacionCard key={publicacion._id} publicacion={publicacion} />
              ))}
            </Box>
          ) : (
            <Box className="pubs__vacio">
              <Typography component="h3" variant="h3">
                No encontramos nada con esa búsqueda
              </Typography>
              <Typography component="p">
                Probá con otra palabra o mirá todas las categorías.
              </Typography>
              <MuiButton variant="contained" onClick={limpiarFiltros}>
                Ver todas las publicaciones
              </MuiButton>
            </Box>
          )}
        </>
      )}
    </Section>
  )
}

export default Publicaciones
