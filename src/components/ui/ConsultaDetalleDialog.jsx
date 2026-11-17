import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MuiButton from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ConsultaEstadoChip from './ConsultaEstadoChip'
import '../../styles/ui/ConsultaDetalleDialog.css'

const formatearFecha = (iso) =>
  new Date(iso).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

function ConsultaDetalleDialog({
  consulta,
  guardando = false,
  onCambiarEstado,
  onEliminar,
  onCerrar,
}) {
  const [copiado, setCopiado] = useState(false)

  const responderPorCorreo = `mailto:${consulta.correo}?subject=${encodeURIComponent(
    `Re: ${consulta.asunto}`,
  )}`

  const llamar = consulta.telefono
    ? `tel:${consulta.telefono.replace(/\s+/g, '')}`
    : ''

  const copiarCorreo = async () => {
    try {
      await navigator.clipboard.writeText(consulta.correo)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <Dialog
      open
      onClose={guardando ? undefined : onCerrar}
      aria-labelledby="consulta-detalle-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="consulta-detalle-title" sx={{ fontWeight: 700 }}>
        Consulta de {consulta.nombre}
      </DialogTitle>

      <DialogContent className="consulta-detalle">
        <Box className="consulta-detalle__meta">
          <ConsultaEstadoChip estado={consulta.estado} />
          <Typography component="span" className="consulta-detalle__fecha">
            Recibida el {formatearFecha(consulta.createdAt)}
          </Typography>
        </Box>

        <Typography component="h3" className="consulta-detalle__asunto">
          {consulta.asunto}
        </Typography>

        <Box className="consulta-detalle__datos">
          <Box className="consulta-detalle__dato">
            <Typography component="span" className="consulta-detalle__label">
              Correo
            </Typography>
            <Box
              component="a"
              href={`mailto:${consulta.correo}`}
              className="consulta-detalle__value"
            >
              {consulta.correo}
            </Box>
          </Box>

          <Box className="consulta-detalle__dato">
            <Typography component="span" className="consulta-detalle__label">
              Teléfono
            </Typography>
            {consulta.telefono ? (
              <Box
                component="a"
                href={llamar}
                className="consulta-detalle__value"
              >
                {consulta.telefono}
              </Box>
            ) : (
              <Typography
                component="span"
                className="consulta-detalle__value consulta-detalle__value--empty"
              >
                No informado
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="consulta-detalle__mensaje">
          <Typography component="span" className="consulta-detalle__label">
            Mensaje
          </Typography>
          <Typography component="p" className="consulta-detalle__texto">
            {consulta.mensaje}
          </Typography>
        </Box>

        <Box className="consulta-detalle__acciones">
          <MuiButton
            component="a"
            href={responderPorCorreo}
            variant="outlined"
            size="small"
          >
            Responder por correo
          </MuiButton>

          <MuiButton variant="text" size="small" onClick={copiarCorreo}>
            {copiado ? 'Correo copiado' : 'Copiar correo'}
          </MuiButton>

          {llamar && (
            <MuiButton
              component="a"
              href={llamar}
              variant="text"
              size="small"
            >
              Llamar
            </MuiButton>
          )}
        </Box>
      </DialogContent>

      <DialogActions className="consulta-detalle__footer">
        <MuiButton
          variant="text"
          color="error"
          onClick={onEliminar}
          disabled={guardando}
        >
          Eliminar
        </MuiButton>

        <Box sx={{ flex: 1 }} />

        <MuiButton variant="text" onClick={onCerrar} disabled={guardando}>
          Cerrar
        </MuiButton>

        {consulta.estado !== 'Respondida' && (
          <MuiButton
            variant="contained"
            onClick={() => onCambiarEstado('Respondida')}
            disabled={guardando}
          >
            {guardando ? 'Guardando…' : 'Marcar respondida'}
          </MuiButton>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ConsultaDetalleDialog
