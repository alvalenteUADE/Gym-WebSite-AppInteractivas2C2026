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
  const [paso, setPaso] = useState('detalle')

  const cuerpoRespuesta = [
    `Hola ${consulta.nombre},`,
    '',
    '',
    '--- Mensaje original ---',
    consulta.mensaje,
  ].join('\n')

  const responderPorCorreo =
    `mailto:${consulta.correo}` +
    `?subject=${encodeURIComponent(`Re: ${consulta.asunto}`)}` +
    `&body=${encodeURIComponent(cuerpoRespuesta)}`

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

  const confirmarRespuesta = () => {
    setPaso('detalle')
    onCambiarEstado('Respondida')
  }

  const esConfirmacion = paso === 'confirmar'

  return (
    <Dialog
      open
      onClose={guardando ? undefined : onCerrar}
      aria-labelledby="consulta-detalle-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="consulta-detalle-title" sx={{ fontWeight: 700 }}>
        {esConfirmacion
          ? '¿Ya enviaste la respuesta?'
          : `Consulta de ${consulta.nombre}`}
      </DialogTitle>

      {esConfirmacion ? (
        <>
          <DialogContent className="consulta-detalle__confirmacion">
            <Typography
              component="p"
              className="consulta-detalle__confirmacion-texto"
            >
              Se abrió tu aplicación de correo con la respuesta lista para{' '}
              <Box
                component="span"
                className="consulta-detalle__confirmacion-correo"
              >
                {consulta.correo}
              </Box>
              .
            </Typography>
            <Typography
              component="p"
              className="consulta-detalle__confirmacion-texto"
            >
              Confirmá recién cuando el correo haya sido enviado. Si lo cerrás
              sin enviarlo, elegí «Todavía no» para no marcar la consulta como
              respondida.
            </Typography>
          </DialogContent>

          <DialogActions className="consulta-detalle__footer">
            <MuiButton
              variant="text"
              onClick={() => setPaso('detalle')}
              disabled={guardando}
            >
              Todavía no
            </MuiButton>

            <MuiButton
              variant="contained"
              onClick={confirmarRespuesta}
              disabled={guardando}
            >
              {guardando ? 'Guardando…' : 'Sí, ya envié el correo'}
            </MuiButton>
          </DialogActions>
        </>
      ) : (
        <>
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
              {consulta.estado !== 'Respondida' && (
                <MuiButton
                  component="a"
                  href={responderPorCorreo}
                  variant="outlined"
                  size="small"
                  onClick={() => setPaso('confirmar')}
                  disabled={guardando}
                >
                  Responder por correo
                </MuiButton>
              )}

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
        </>
      )}
    </Dialog>
  )
}

export default ConsultaDetalleDialog
