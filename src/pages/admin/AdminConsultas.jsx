import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MuiButton from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
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
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import ConsultaDetalleDialog from '../../components/ui/ConsultaDetalleDialog'
import { useConsultas } from '../../hooks/useConsultas'
import '../../styles/pages/AdminConsultas.css'

const ESTADOS = ['Pendiente', 'Leída', 'Respondida']

const formatearFecha = (iso) =>
  new Date(iso).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

function AdminConsultas() {
  const {
    consultas,
    cargando,
    errorCarga,
    guardando,
    modificarEstado,
    eliminar,
  } = useConsultas()

  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('todas')
  const [detalle, setDetalle] = useState(null)
  const [aEliminar, setAEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)

  const resumen = useMemo(
    () => ({
      total: consultas.length,
      pendientes: consultas.filter((c) => c.estado === 'Pendiente').length,
      leidas: consultas.filter((c) => c.estado === 'Leída').length,
      respondidas: consultas.filter((c) => c.estado === 'Respondida').length,
    }),
    [consultas],
  )

  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return consultas.filter((consulta) => {
      const coincideTexto =
        !termino ||
        consulta.nombre.toLowerCase().includes(termino) ||
        consulta.correo.toLowerCase().includes(termino) ||
        consulta.asunto.toLowerCase().includes(termino) ||
        consulta.mensaje.toLowerCase().includes(termino)

      const coincideEstado =
        estadoFiltro === 'todas' || consulta.estado === estadoFiltro

      return coincideTexto && coincideEstado
    })
  }, [consultas, busqueda, estadoFiltro])

  const abrirDetalle = async (consulta) => {
    setDetalle(consulta)

    // Al abrir una consulta pendiente se marca como leída, igual
    // que el comportamiento de una bandeja de entrada.
    if (consulta.estado === 'Pendiente') {
      const resultado = await modificarEstado(consulta._id, 'Leída')

      if (resultado.ok) {
        setDetalle(resultado.data)
      } else {
        setAviso({ texto: resultado.error, severidad: 'error' })
      }
    }
  }

  const cambiarEstado = async (consulta, estado) => {
    const resultado = await modificarEstado(consulta._id, estado)

    if (!resultado.ok) {
      setAviso({ texto: resultado.error, severidad: 'error' })
      return
    }

    if (detalle?._id === consulta._id) {
      setDetalle(resultado.data)
    }

    setAviso({
      texto: `La consulta de «${consulta.nombre}» quedó como «${estado}».`,
      severidad: 'success',
    })
  }

  const confirmarEliminacion = async () => {
    const resultado = await eliminar(aEliminar._id)

    if (!resultado.ok) {
      setAviso({ texto: resultado.error, severidad: 'error' })
      return
    }

    setAviso({
      texto: `Se eliminó la consulta de «${aEliminar.nombre}».`,
      severidad: 'success',
    })
    setAEliminar(null)
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setEstadoFiltro('todas')
  }

  const hayConsultas = consultas.length > 0
  const hayResultados = filtradas.length > 0
  const hayFiltrosActivos =
    Boolean(busqueda.trim()) || estadoFiltro !== 'todas'

  return (
    <>
      <Section
        id="consultas"
        eyebrow="Contacto"
        title="Consultas"
        description="Los mensajes que llegan desde el formulario de contacto del sitio. Seguí su estado hasta responderlos."
      >
        {hayConsultas && (
          <Box className="consultas__summary">
            <Chip label={`${resumen.total} en total`} size="small" />
            <Chip
              label={`${resumen.pendientes} pendientes`}
              size="small"
              color="warning"
            />
            <Chip
              label={`${resumen.leidas} leídas`}
              size="small"
              color="info"
              variant="outlined"
            />
            <Chip
              label={`${resumen.respondidas} respondidas`}
              size="small"
              color="success"
              variant="outlined"
            />
          </Box>
        )}

        <Box className="consultas__toolbar">
          <Box className="consultas__filters">
            <TextField
              className="consultas__search"
              label="Buscar por nombre, correo o asunto"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              type="search"
              size="small"
              disabled={cargando || !hayConsultas}
            />

            <TextField
              select
              className="consultas__filter"
              label="Estado"
              value={estadoFiltro}
              onChange={(event) => setEstadoFiltro(event.target.value)}
              size="small"
              disabled={cargando}
            >
              <MenuItem value="todas">Todas</MenuItem>
              {ESTADOS.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </TextField>

            {hayFiltrosActivos && (
              <MuiButton variant="text" size="small" onClick={limpiarFiltros}>
                Limpiar
              </MuiButton>
            )}
          </Box>
        </Box>

        {errorCarga && (
          <Alert severity="error" className="consultas__alert">
            {errorCarga}
          </Alert>
        )}

        {cargando ? (
          <Box className="consultas__loading" role="status">
            <CircularProgress size={28} />
            <Typography component="span">Cargando consultas…</Typography>
          </Box>
        ) : (
          <>
            {!hayConsultas && !errorCarga && (
              <Box className="consultas__empty">
                <Typography component="h3" variant="h3">
                  Todavía no hay consultas
                </Typography>
                <Typography component="p">
                  Cuando alguien complete el formulario de contacto, el mensaje
                  va a aparecer acá.
                </Typography>
              </Box>
            )}

            {hayConsultas && !hayResultados && (
              <Box className="consultas__empty">
                <Typography component="p">
                  Ninguna consulta coincide con los filtros aplicados.
                </Typography>
                <MuiButton variant="outlined" onClick={limpiarFiltros}>
                  Limpiar filtros
                </MuiButton>
              </Box>
            )}

            {hayResultados && (
              <TableContainer className="consultas__table-wrapper">
                <Table aria-label="Listado de consultas">
                  <TableHead>
                    <TableRow>
                      <TableCell>Consulta</TableCell>
                      <TableCell>Contacto</TableCell>
                      <TableCell>Recibida</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filtradas.map((consulta) => (
                      <TableRow
                        key={consulta._id}
                        hover
                        className={
                          consulta.estado === 'Pendiente'
                            ? 'consultas__row--pendiente'
                            : undefined
                        }
                      >
                        <TableCell>
                          <Box className="consultas__name-cell">
                            <Typography
                              component="span"
                              className="consultas__name"
                            >
                              {consulta.nombre}
                            </Typography>
                            <Typography
                              component="span"
                              className="consultas__subject"
                            >
                              {consulta.asunto}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box className="consultas__contact-cell">
                            <Box
                              component="a"
                              href={`mailto:${consulta.correo}`}
                              className="consultas__contact-link"
                            >
                              {consulta.correo}
                            </Box>
                            {consulta.telefono && (
                              <Box
                                component="a"
                                href={`tel:${consulta.telefono.replace(
                                  /\s+/g,
                                  '',
                                )}`}
                                className="consultas__contact-phone"
                              >
                                {consulta.telefono}
                              </Box>
                            )}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography
                            component="span"
                            className="consultas__date"
                          >
                            {formatearFecha(consulta.createdAt)}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <TextField
                            select
                            size="small"
                            className="consultas__estado-select"
                            value={consulta.estado}
                            onChange={(event) =>
                              cambiarEstado(consulta, event.target.value)
                            }
                            disabled={guardando}
                            slotProps={{
                              input: {
                                'aria-label': `Estado de la consulta de ${consulta.nombre}`,
                              },
                            }}
                          >
                            {ESTADOS.map((estado) => (
                              <MenuItem key={estado} value={estado}>
                                {estado}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>

                        <TableCell align="right">
                          <Box className="consultas__actions">
                            <MuiButton
                              size="small"
                              variant="outlined"
                              onClick={() => abrirDetalle(consulta)}
                            >
                              Ver
                            </MuiButton>

                            <Tooltip title="Eliminar consulta">
                              <IconButton
                                aria-label={`Eliminar consulta de ${consulta.nombre}`}
                                onClick={() => setAEliminar(consulta)}
                                size="small"
                                disabled={guardando}
                              >
                                <Box
                                  component="span"
                                  className="consultas__delete-icon"
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

      {detalle && (
        <ConsultaDetalleDialog
          consulta={detalle}
          guardando={guardando}
          onCambiarEstado={(estado) => cambiarEstado(detalle, estado)}
          onEliminar={() => {
            setAEliminar(detalle)
            setDetalle(null)
          }}
          onCerrar={() => setDetalle(null)}
        />
      )}

      <ConfirmDialog
        abierto={Boolean(aEliminar)}
        titulo="Eliminar consulta"
        mensaje={`¿Seguro que querés eliminar la consulta de «${aEliminar?.nombre}» sobre «${aEliminar?.asunto}»? Esta acción no se puede deshacer.`}
        procesando={guardando}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setAEliminar(null)}
      />

      <Snackbar
        open={Boolean(aviso)}
        autoHideDuration={4000}
        onClose={() => setAviso(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={aviso?.severidad ?? 'success'}
          onClose={() => setAviso(null)}
        >
          {aviso?.texto}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AdminConsultas
