import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MuiButton from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Section from '../../components/layout/Section'
import PublicacionFormDialog from '../../components/forms/PublicacionFormDialog'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useCategorias } from '../../hooks/useCategorias'
import { usePublicaciones } from '../../hooks/usePublicaciones'
import '../../styles/pages/AdminPublicaciones.css'

const DIALOGO_CERRADO = { modo: 'cerrado', publicacion: null }

const ESTADOS = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'activas', label: 'Activas' },
  { valor: 'inactivas', label: 'Dadas de baja' },
]

// El modelo permite publicaciones sin precio (un servicio, por ejemplo).
const formatearPrecio = (precio) => {
  if (precio === undefined || precio === null) {
    return 'Sin precio'
  }

  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
}

function AdminPublicaciones() {
  const {
    publicaciones,
    cargando,
    errorCarga,
    guardando,
    crear,
    modificar,
    cambiarEstado,
    eliminar,
  } = usePublicaciones()

  // Las categorías alimentan el select del formulario y el filtro.
  const { categorias, cargando: cargandoCategorias } = useCategorias()

  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')
  const [estadoFiltro, setEstadoFiltro] = useState('todas')
  const [dialogo, setDialogo] = useState(DIALOGO_CERRADO)
  const [aEliminar, setAEliminar] = useState(null)
  const [aviso, setAviso] = useState('')

  // Los tres filtros se combinan. Se resuelve en memoria porque el
  // backend no expone búsqueda ni filtrado; al integrar, esto puede
  // pasar a query params sin cambiar la interfaz del componente.
  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return publicaciones.filter((publicacion) => {
      const coincideTexto =
        !termino ||
        publicacion.nombre.toLowerCase().includes(termino) ||
        publicacion.descripcion.toLowerCase().includes(termino)

      const coincideCategoria =
        categoriaFiltro === 'todas' ||
        publicacion.categoria?._id === categoriaFiltro

      const coincideEstado =
        estadoFiltro === 'todas' ||
        (estadoFiltro === 'activas' ? publicacion.activa : !publicacion.activa)

      return coincideTexto && coincideCategoria && coincideEstado
    })
  }, [publicaciones, busqueda, categoriaFiltro, estadoFiltro])

  const resumen = useMemo(
    () => ({
      total: publicaciones.length,
      activas: publicaciones.filter((item) => item.activa).length,
      destacadas: publicaciones.filter((item) => item.destacada).length,
    }),
    [publicaciones],
  )

  const abrirCreacion = () => setDialogo({ modo: 'crear', publicacion: null })

  const abrirEdicion = (publicacion) =>
    setDialogo({ modo: 'editar', publicacion })

  const cerrarDialogo = () => setDialogo(DIALOGO_CERRADO)

  const guardar = async (datos) => {
    const esEdicion = dialogo.modo === 'editar'

    const resultado = esEdicion
      ? await modificar(dialogo.publicacion._id, datos)
      : await crear(datos)

    if (resultado.ok) {
      cerrarDialogo()
      setAviso(
        esEdicion
          ? `Se modificó «${datos.nombre}».`
          : `Se creó «${datos.nombre}».`,
      )
    }

    return resultado
  }

  // Baja lógica: no borra el registro, sólo lo saca del sitio público.
  const alternarEstado = async (publicacion) => {
    const resultado = await cambiarEstado(publicacion._id, !publicacion.activa)

    if (resultado.ok) {
      setAviso(
        publicacion.activa
          ? `«${publicacion.nombre}» se dio de baja.`
          : `«${publicacion.nombre}» se activó.`,
      )
    }
  }

  const confirmarEliminacion = async () => {
    const resultado = await eliminar(aEliminar._id)

    if (resultado.ok) {
      setAviso(`Se eliminó «${aEliminar.nombre}».`)
      setAEliminar(null)
    }
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoriaFiltro('todas')
    setEstadoFiltro('todas')
  }

  const hayPublicaciones = publicaciones.length > 0
  const hayResultados = filtradas.length > 0
  const hayFiltrosActivos =
    Boolean(busqueda.trim()) ||
    categoriaFiltro !== 'todas' ||
    estadoFiltro !== 'todas'

  return (
    <>
      <Section
        id="publicaciones"
        eyebrow="Gestión"
        title="Publicaciones"
        description="Los productos y servicios que se muestran en el sitio. Cada uno pertenece a una categoría y puede darse de baja sin perder el registro."
      >
        {hayPublicaciones && (
          <Box className="publicaciones__summary">
            <Chip label={`${resumen.total} en total`} size="small" />
            <Chip
              label={`${resumen.activas} activas`}
              size="small"
              color="primary"
            />
            <Chip
              label={`${resumen.destacadas} destacadas`}
              size="small"
              variant="outlined"
            />
          </Box>
        )}

        <Box className="publicaciones__toolbar">
          <Box className="publicaciones__filters">
            <TextField
              className="publicaciones__search"
              label="Buscar por nombre o descripción"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              type="search"
              size="small"
              disabled={cargando || !hayPublicaciones}
            />

            <TextField
              select
              className="publicaciones__filter"
              label="Categoría"
              value={categoriaFiltro}
              onChange={(event) => setCategoriaFiltro(event.target.value)}
              size="small"
              disabled={cargando || cargandoCategorias}
            >
              <MenuItem value="todas">Todas</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              className="publicaciones__filter"
              label="Estado"
              value={estadoFiltro}
              onChange={(event) => setEstadoFiltro(event.target.value)}
              size="small"
              disabled={cargando}
            >
              {ESTADOS.map((estado) => (
                <MenuItem key={estado.valor} value={estado.valor}>
                  {estado.label}
                </MenuItem>
              ))}
            </TextField>

            {hayFiltrosActivos && (
              <MuiButton variant="text" size="small" onClick={limpiarFiltros}>
                Limpiar
              </MuiButton>
            )}
          </Box>

          <MuiButton
            variant="contained"
            onClick={abrirCreacion}
            disabled={cargando || categorias.length === 0}
          >
            Nueva publicación
          </MuiButton>
        </Box>

        {errorCarga && (
          <Alert severity="error" className="publicaciones__alert">
            {errorCarga}
          </Alert>
        )}

        {!cargandoCategorias && categorias.length === 0 && (
          <Alert severity="info" className="publicaciones__alert">
            Primero tenés que crear al menos una categoría: toda publicación
            necesita estar asociada a una.
          </Alert>
        )}

        {cargando ? (
          <Box className="publicaciones__loading" role="status">
            <CircularProgress size={28} />
            <Typography component="span">Cargando publicaciones…</Typography>
          </Box>
        ) : (
          <>
            {!hayPublicaciones && !errorCarga && (
              <Box className="publicaciones__empty">
                <Typography component="h3" variant="h3">
                  Todavía no hay publicaciones
                </Typography>
                <Typography component="p">
                  Creá la primera para que empiece a verse en el sitio.
                </Typography>
                <MuiButton
                  variant="contained"
                  onClick={abrirCreacion}
                  disabled={categorias.length === 0}
                >
                  Crear la primera publicación
                </MuiButton>
              </Box>
            )}

            {hayPublicaciones && !hayResultados && (
              <Box className="publicaciones__empty">
                <Typography component="p">
                  Ninguna publicación coincide con los filtros aplicados.
                </Typography>
                <MuiButton variant="outlined" onClick={limpiarFiltros}>
                  Limpiar filtros
                </MuiButton>
              </Box>
            )}

            {hayResultados && (
              <TableContainer className="publicaciones__table-wrapper">
                <Table aria-label="Listado de publicaciones">
                  <TableHead>
                    <TableRow>
                      <TableCell>Publicación</TableCell>
                      <TableCell>Categoría</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filtradas.map((publicacion) => (
                      <TableRow
                        key={publicacion._id}
                        hover
                        className={
                          publicacion.activa
                            ? undefined
                            : 'publicaciones__row--inactiva'
                        }
                      >
                        <TableCell>
                          <Box className="publicaciones__name-cell">
                            <Typography
                              component="span"
                              className="publicaciones__name"
                            >
                              {publicacion.nombre}
                            </Typography>

                            <Box className="publicaciones__badges">
                              {publicacion.destacada && (
                                <Chip
                                  label="Destacada"
                                  size="small"
                                  color="secondary"
                                />
                              )}
                              {!publicacion.disponible && (
                                <Chip
                                  label="Sin cupo"
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                              {publicacion.imagenes.length > 0 && (
                                <Chip
                                  label={`${publicacion.imagenes.length} img`}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          {publicacion.categoria?.nombre ?? '—'}
                        </TableCell>

                        <TableCell align="right">
                          <Typography
                            component="span"
                            className={
                              publicacion.precio === undefined ||
                              publicacion.precio === null
                                ? 'publicaciones__price publicaciones__price--empty'
                                : 'publicaciones__price'
                            }
                          >
                            {formatearPrecio(publicacion.precio)}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip
                            title={
                              publicacion.activa
                                ? 'Dar de baja (deja de verse en el sitio)'
                                : 'Activar'
                            }
                          >
                            <Switch
                              checked={publicacion.activa}
                              onChange={() => alternarEstado(publicacion)}
                              disabled={guardando}
                              slotProps={{
                                input: {
                                  'aria-label': `${
                                    publicacion.activa
                                      ? 'Dar de baja'
                                      : 'Activar'
                                  } ${publicacion.nombre}`,
                                },
                              }}
                            />
                          </Tooltip>
                        </TableCell>

                        <TableCell align="right">
                          <Box className="publicaciones__actions">
                            <MuiButton
                              size="small"
                              variant="outlined"
                              onClick={() => abrirEdicion(publicacion)}
                            >
                              Modificar
                            </MuiButton>

                            <Tooltip title="Eliminar definitivamente">
                              <IconButton
                                aria-label={`Eliminar ${publicacion.nombre}`}
                                onClick={() => setAEliminar(publicacion)}
                                size="small"
                              >
                                <Box
                                  component="span"
                                  className="publicaciones__delete-icon"
                                  aria-hidden="true"
                                >
                                  ×
                                </Box>
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Section>

      {dialogo.modo !== 'cerrado' && (
        <PublicacionFormDialog
          publicacion={dialogo.publicacion}
          categorias={categorias}
          guardando={guardando}
          onGuardar={guardar}
          onCerrar={cerrarDialogo}
        />
      )}

      <ConfirmDialog
        abierto={Boolean(aEliminar)}
        titulo="Eliminar publicación"
        mensaje={`¿Seguro que querés eliminar «${aEliminar?.nombre}»? Se borra definitivamente y no se puede deshacer. Si sólo querés sacarla del sitio, dale de baja con el interruptor de estado.`}
        procesando={guardando}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setAEliminar(null)}
      />

      <Snackbar
        open={Boolean(aviso)}
        autoHideDuration={4000}
        onClose={() => setAviso('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setAviso('')}>
          {aviso}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AdminPublicaciones
