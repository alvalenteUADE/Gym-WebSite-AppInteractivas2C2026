import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MuiButton from '@mui/material/Button'

/**
 * Diálogo de confirmación para acciones destructivas.
 *
 * Genérico a propósito: lo usan tanto categorías como publicaciones.
 * Si `bloqueo` viene con texto, la acción se muestra impedida y el
 * botón de confirmar queda deshabilitado (ej: una categoría en uso).
 */
function ConfirmDialog({
  abierto,
  titulo,
  mensaje,
  bloqueo = '',
  etiquetaConfirmar = 'Eliminar',
  etiquetaCancelar = 'Cancelar',
  procesando = false,
  onConfirmar,
  onCancelar,
}) {
  const estaBloqueado = Boolean(bloqueo)

  return (
    <Dialog
      open={abierto}
      onClose={procesando ? undefined : onCancelar}
      aria-labelledby="confirm-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="confirm-dialog-title" sx={{ fontWeight: 700 }}>
        {titulo}
      </DialogTitle>

      <DialogContent>
        {estaBloqueado ? (
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            {bloqueo}
          </Alert>
        ) : (
          <DialogContentText>{mensaje}</DialogContentText>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <MuiButton
          variant="text"
          onClick={onCancelar}
          disabled={procesando}
        >
          {estaBloqueado ? 'Entendido' : etiquetaCancelar}
        </MuiButton>

        {!estaBloqueado && (
          <MuiButton
            variant="contained"
            color="error"
            onClick={onConfirmar}
            disabled={procesando}
          >
            {procesando ? 'Eliminando…' : etiquetaConfirmar}
          </MuiButton>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
