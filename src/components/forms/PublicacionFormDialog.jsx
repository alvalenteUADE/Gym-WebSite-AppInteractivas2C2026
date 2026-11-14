import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import MuiButton from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import '../../styles/forms/PublicacionFormDialog.css'

const LARGO_NOMBRE = 80
const LARGO_DESCRIPCION = 600


const VACIO = {
  nombre: '',
  descripcion: '',
  categoria: '',
  precio: '',
  disponible: true,
  destacada: false,
}

const desdePublicacion = (publicacion) => ({
  nombre: publicacion.nombre ?? '',
  descripcion: publicacion.descripcion ?? '',
  categoria: publicacion.categoria?._id ?? '',
  precio: publicacion.precio ?? '',
  disponible: publicacion.disponible ?? true,
  destacada: publicacion.destacada ?? false,
})


function PublicacionFormDialog({
  publicacion = null,
  categorias = [],
  guardando = false,
  onGuardar,
  onCerrar,
}) {
  const esEdicion = Boolean(publicacion)

  const [valores, setValores] = useState(
    publicacion ? desdePublicacion(publicacion) : VACIO,
  )
  const [imagenes, setImagenes] = useState(publicacion?.imagenes ?? [])
  const [nuevaImagen, setNuevaImagen] = useState('')
  const [errores, setErrores] = useState({})
  const [errorServidor, setErrorServidor] = useState('')

  const actualizar = (campo) => (event) => {
    const { value, checked, type } = event.target

    setValores((previos) => ({
      ...previos,
      [campo]: type === 'checkbox' ? checked : value,
    }))

    if (errores[campo]) {
      setErrores((previos) => {
        const siguiente = { ...previos }
        delete siguiente[campo]
        return siguiente
      })
    }

    if (errorServidor) {
      setErrorServidor('')
    }
  }

  const agregarImagen = () => {
    const url = nuevaImagen.trim()

    if (!url) {
      return
    }

    if (imagenes.includes(url)) {
      setErrores((previos) => ({
        ...previos,
        imagen: 'Esa imagen ya está en la lista.',
      }))
      return
    }

    setImagenes((previas) => [...previas, url])
    setNuevaImagen('')
    setErrores((previos) => {
      const siguiente = { ...previos }
      delete siguiente.imagen
      return siguiente
    })
  }

  const quitarImagen = (url) => {
    setImagenes((previas) => previas.filter((imagen) => imagen !== url))
  }

 
  const validar = () => {
    const siguiente = {}
    const nombre = valores.nombre.trim()
    const descripcion = valores.descripcion.trim()

    if (!nombre) {
      siguiente.nombre = 'El nombre es obligatorio.'
    } else if (nombre.length < 3) {
      siguiente.nombre = 'El nombre debe tener al menos 3 caracteres.'
    }

    if (!descripcion) {
      siguiente.descripcion = 'La descripción es obligatoria.'
    } else if (descripcion.length < 10) {
      siguiente.descripcion = 'La descripción debe tener al menos 10 caracteres.'
    }

    if (!valores.categoria) {
      siguiente.categoria = 'Elegí una categoría.'
    }

    if (valores.precio !== '' && valores.precio !== null) {
      const numero = Number(valores.precio)

      if (Number.isNaN(numero)) {
        siguiente.precio = 'El precio debe ser un número.'
      } else if (numero < 0) {
        siguiente.precio = 'El precio no puede ser negativo.'
      }
    }

    return siguiente
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()

    const siguiente = validar()

    if (Object.keys(siguiente).length > 0) {
      setErrores(siguiente)
      return
    }

    const resultado = await onGuardar({
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      categoria: valores.categoria,
      precio: valores.precio === '' ? null : Number(valores.precio),
      disponible: valores.disponible,
      destacada: valores.destacada,
      imagenes,
    })

    if (!resultado.ok) {
      setErrorServidor(resultado.error)
    }
  }

  return (
    <Dialog
      open
      onClose={guardando ? undefined : onCerrar}
      aria-labelledby="publicacion-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="publicacion-dialog-title" sx={{ fontWeight: 700 }}>
        {esEdicion ? 'Modificar publicación' : 'Nueva publicación'}
      </DialogTitle>

      <Box component="form" onSubmit={manejarEnvio} noValidate>
        <DialogContent className="publicacion-form">
          <TextField
            label="Nombre"
            value={valores.nombre}
            onChange={actualizar('nombre')}
            error={Boolean(errores.nombre)}
            helperText={errores.nombre}
            slotProps={{ htmlInput: { maxLength: LARGO_NOMBRE } }}
            disabled={guardando}
            autoFocus
            fullWidth
            required
          />

          <TextField
            label="Descripción"
            value={valores.descripcion}
            onChange={actualizar('descripcion')}
            error={Boolean(errores.descripcion)}
            helperText={
              errores.descripcion ||
              `${valores.descripcion.length} / ${LARGO_DESCRIPCION} caracteres`
            }
            slotProps={{ htmlInput: { maxLength: LARGO_DESCRIPCION } }}
            disabled={guardando}
            multiline
            minRows={4}
            fullWidth
            required
          />

          <Box className="publicacion-form__row">
            <TextField
              select
              label="Categoría"
              value={valores.categoria}
              onChange={actualizar('categoria')}
              error={Boolean(errores.categoria)}
              helperText={errores.categoria}
              disabled={guardando || categorias.length === 0}
              fullWidth
              required
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Precio"
              value={valores.precio}
              onChange={actualizar('precio')}
              error={Boolean(errores.precio)}
              helperText={errores.precio || 'Opcional: dejalo vacío si es un servicio sin precio'}
              type="number"
              slotProps={{
                htmlInput: { min: 0, step: 100 },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
              disabled={guardando}
              fullWidth
            />
          </Box>

          
          <Box className="publicacion-form__images">
            <Typography component="span" className="publicacion-form__label">
              Imágenes
            </Typography>

            <Box className="publicacion-form__image-input">
              <TextField
                label="URL de la imagen"
                value={nuevaImagen}
                onChange={(event) => setNuevaImagen(event.target.value)}
                onKeyDown={(event) => {
                  // Enter agrega la imagen en lugar de enviar el formulario
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    agregarImagen()
                  }
                }}
                error={Boolean(errores.imagen)}
                helperText={errores.imagen}
                size="small"
                disabled={guardando}
                fullWidth
              />

              <MuiButton
                type="button"
                variant="outlined"
                size="small"
                onClick={agregarImagen}
                disabled={guardando || !nuevaImagen.trim()}
              >
                Agregar
              </MuiButton>
            </Box>

            {imagenes.length > 0 ? (
              <Box className="publicacion-form__chips">
                {imagenes.map((url) => (
                  <Chip
                    key={url}
                    label={url}
                    onDelete={guardando ? undefined : () => quitarImagen(url)}
                    variant="outlined"
                    size="small"
                    className="publicacion-form__chip"
                  />
                ))}
              </Box>
            ) : (
              <Typography component="span" className="publicacion-form__hint">
                Sin imágenes. La publicación se va a mostrar con un
                placeholder en el sitio.
              </Typography>
            )}
          </Box>

          <Box className="publicacion-form__switches">
            <FormControlLabel
              control={
                <Switch
                  checked={valores.disponible}
                  onChange={actualizar('disponible')}
                  disabled={guardando}
                />
              }
              label="Disponible"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={valores.destacada}
                  onChange={actualizar('destacada')}
                  disabled={guardando}
                />
              }
              label="Destacada en la portada"
            />
          </Box>

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

export default PublicacionFormDialog
