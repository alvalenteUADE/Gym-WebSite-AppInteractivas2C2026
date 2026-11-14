import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MuiButton from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const LARGO_MAXIMO = 60


function CategoriaFormDialog({
  categoria = null,
  guardando = false,
  onGuardar,
  onCerrar,
}) {
  const esEdicion = Boolean(categoria)

  const [nombre, setNombre] = useState(categoria?.nombre ?? '')
  const [error, setError] = useState('')
  const [errorServidor, setErrorServidor] = useState('')

  
  const validar = (valor) => {
    const limpio = valor.trim()

    if (!limpio) {
      return 'El nombre es obligatorio.'
    }

    if (limpio.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres.'
    }

    if (limpio.length > LARGO_MAXIMO) {
      return `El nombre no puede superar los ${LARGO_MAXIMO} caracteres.`
    }

    return ''
  }

  const manejarCambio = (event) => {
    setNombre(event.target.value)

    if (error) {
      setError('')
    }

    if (errorServidor) {
      setErrorServidor('')
    }
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()

    const mensaje = validar(nombre)

    if (mensaje) {
      setError(mensaje)
      return
    }

    const resultado = await onGuardar(nombre.trim())

    if (!resultado.ok) {
      setErrorServidor(resultado.error)
    }
  }

  return (
    <Dialog
      open
      onClose={guardando ? undefined : onCerrar}
      aria-labelledby="categoria-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="categoria-dialog-title" sx={{ fontWeight: 700 }}>
        {esEdicion ? 'Modificar categoría' : 'Nueva categoría'}
      </DialogTitle>

      <Box component="form" onSubmit={manejarEnvio} noValidate>
        <DialogContent sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={nombre}
            onChange={manejarCambio}
            error={Boolean(error)}
            helperText={error || `Hasta ${LARGO_MAXIMO} caracteres.`}
            disabled={guardando}
            slotProps={{ htmlInput: { maxLength: LARGO_MAXIMO } }}
            autoFocus
            fullWidth
            required
          />

          {errorServidor && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {errorServidor}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <MuiButton variant="text" onClick={onCerrar} disabled={guardando}>
            Cancelar
          </MuiButton>

          <MuiButton type="submit" variant="contained" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar'}
          </MuiButton>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CategoriaFormDialog
