import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Section from '../../components/layout/Section'
import { modificarPerfil } from '../../services/usuario.service'

const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/
const TELEFONO_REGEX = /^\+?[0-9\s()-]+$/

function leerUsuarioStorage() {
  for (const clave of ['usuario', 'user', 'admin']) {
    const raw = localStorage.getItem(clave)
    if (!raw) continue
    try {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        return { clave, datos: parsed }
      }
    } catch {
      // ignorar JSON inválido
    }
  }
  return { clave: 'usuario', datos: {} }
}

function Perfil() {
  const [storageMeta] = useState(() => leerUsuarioStorage())
  const [form, setForm] = useState({
    nombre: storageMeta.datos.nombre || '',
    apellido: storageMeta.datos.apellido || '',
    correo: storageMeta.datos.correo || storageMeta.datos.email || '',
    telefono: storageMeta.datos.telefono || '',
  })
  const [guardando, setGuardando] = useState(false)
  const [mensajeExito, setMensajeExito] = useState('')
  const [mensajeError, setMensajeError] = useState('')

  useEffect(() => {
    setForm({
      nombre: storageMeta.datos.nombre || '',
      apellido: storageMeta.datos.apellido || '',
      correo: storageMeta.datos.correo || storageMeta.datos.email || '',
      telefono: storageMeta.datos.telefono || '',
    })
  }, [storageMeta])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensajeExito('')
    setMensajeError('')

    const payload = {}
    const nombreLimpio = form.nombre.trim()
    const apellidoLimpio = form.apellido.trim()
    const correoLimpio = form.correo.trim()
    const telefonoLimpio = form.telefono.trim()

    if (nombreLimpio) {
      if (!NOMBRE_REGEX.test(nombreLimpio)) {
        setMensajeError('El nombre solo puede contener letras y espacios.')
        return
      }
      payload.nombre = nombreLimpio
    }

    if (apellidoLimpio) {
      if (!NOMBRE_REGEX.test(apellidoLimpio)) {
        setMensajeError('El apellido solo puede contener letras y espacios.')
        return
      }
      payload.apellido = apellidoLimpio
    }

    if (telefonoLimpio) {
      const soloDigitos = telefonoLimpio.replace(/\D/g, '')
      if (
        !TELEFONO_REGEX.test(telefonoLimpio) ||
        soloDigitos.length < 8 ||
        soloDigitos.length > 15
      ) {
        setMensajeError(
          'El teléfono no es válido. Ingresá entre 8 y 15 dígitos.',
        )
        return
      }
      payload.telefono = telefonoLimpio
    }

    if (correoLimpio) payload.correo = correoLimpio

    if (Object.keys(payload).length === 0) {
      setMensajeError('Completá al menos un campo para actualizar.')
      return
    }

    setGuardando(true)

    try {
      const actualizado = await modificarPerfil(payload)

      if (actualizado && typeof actualizado === 'object') {
        setForm({
          nombre: actualizado.nombre ?? form.nombre,
          apellido: actualizado.apellido ?? form.apellido,
          correo: actualizado.correo ?? form.correo,
          telefono: actualizado.telefono ?? form.telefono,
        })
        if (localStorage.getItem(storageMeta.clave)) {
          localStorage.setItem(
            storageMeta.clave,
            JSON.stringify({ ...storageMeta.datos, ...actualizado }),
          )
        }
      }

      setMensajeExito(
        payload.correo
          ? 'Datos actualizados correctamente. Si cambiaste tu correo, usá el nuevo en tu próximo inicio de sesión.'
          : 'Datos actualizados correctamente.',
      )
    } catch (error) {
      setMensajeError(
        error.message || 'No se pudieron actualizar los datos del perfil.',
      )
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Section
      id="perfil"
      eyebrow="Cuenta"
      title="Mi perfil"
      description="Modificá tus datos personales de administrador y la dirección de correo con la que iniciás sesión."
    >
      <Box sx={{ maxWidth: 600 }}>
        <Card elevation={0} variant="outlined">
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                {mensajeExito && <Alert severity="success">{mensajeExito}</Alert>}
                {mensajeError && <Alert severity="error">{mensajeError}</Alert>}

                <TextField
                  label="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  slotProps={{ htmlInput: { maxLength: 60 } }}
                  fullWidth
                />

                <TextField
                  label="Apellido"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  slotProps={{ htmlInput: { maxLength: 60 } }}
                  fullWidth
                />

                <TextField
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  slotProps={{ htmlInput: { maxLength: 100 } }}
                  fullWidth
                />

                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  slotProps={{ htmlInput: { maxLength: 20 } }}
                  fullWidth
                />

                <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    component={Link}
                    to="/admin"
                    variant="outlined"
                    disabled={guardando}
                  >
                    Volver al panel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={guardando}
                  >
                    {guardando ? 'Guardando…' : 'Guardar cambios'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Section>
  )
}

export default Perfil