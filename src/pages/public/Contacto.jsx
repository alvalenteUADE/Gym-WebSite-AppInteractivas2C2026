import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '../../components/ui/Button'
import Section from '../../components/layout/Section'
import { crearConsulta } from '../../services/consulta.service'
import '../../styles/pages/Contacto.css'

const contactDetails = [
  {
    label: 'Visitanos',
    value: 'Av. Corrientes 1234, CABA',
  },
  {
    label: 'Llamanos',
    value: '011-4555-1234',
    href: 'tel:+541145551234',
  },
  {
    label: 'Horarios',
    value: 'Lunes a viernes de 7 a 23 h · Sábados de 9 a 20 h',
  },
]

function Contacto() {
  const [notice, setNotice] = useState(null)
  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const requiredFields = ['nombre', 'correo', 'asunto', 'mensaje']
    const nextErrors = Object.fromEntries(
      requiredFields
        .filter((name) => !formData.get(name)?.toString().trim())
        .map((name) => [name, 'Este campo es obligatorio.']),
    )
    const correo = formData.get('correo')?.toString().trim() ?? ''

    if (
      correo &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
    ) {
      nextErrors.correo = 'Ingresá un correo electrónico válido.'
    }

    setErrors(nextErrors)
    setNotice(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setEnviando(true)

    try {
      await crearConsulta({
        nombre: formData.get('nombre').toString().trim(),
        correo,
        telefono: formData.get('telefono')?.toString().trim() ?? '',
        asunto: formData.get('asunto').toString().trim(),
        mensaje: formData.get('mensaje').toString().trim(),
      })

      form.reset()
      setNotice({
        severity: 'success',
        texto:
          '¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad.',
      })
    } catch (error) {
      setNotice({
        severity: 'error',
        texto:
          error.message ||
          'No pudimos enviar la consulta. Intentá nuevamente en unos minutos.',
      })
    } finally {
      setEnviando(false)
    }
  }

  const handleChange = (event) => {
    const { name } = event.target

    if (errors[name]) {
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors }
        delete nextErrors[name]
        return nextErrors
      })
    }
  }

  return (
    <Section
      id="contacto"
      eyebrow="Contacto"
      title="Hablemos de tus objetivos."
      description="Dejanos tu consulta y conocé cómo podemos acompañarte en tu próximo entrenamiento."
      tone="muted"
      className="contact"
    >
      <Box className="contact__layout">
        <Box className="contact__info">
          <Typography component="h3" variant="h3" className="contact__info-title">
            Estamos para ayudarte
          </Typography>
          <Typography component="p" className="contact__info-description">
            Escribinos para conocer las actividades, consultar por los planes o
            coordinar una visita al gimnasio.
          </Typography>

          <Stack component="ul" className="contact__details">
            {contactDetails.map((detail) => (
              <Box component="li" className="contact__detail" key={detail.label}>
                <Typography component="span" className="contact__detail-label">
                  {detail.label}
                </Typography>
                {detail.href ? (
                  <Box component="a" href={detail.href} className="contact__detail-value">
                    {detail.value}
                  </Box>
                ) : (
                  <Typography component="span" className="contact__detail-value">
                    {detail.value}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          component="form"
          className="contact__form"
          noValidate
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <Typography component="h3" variant="h3" className="contact__form-title">
            Envianos tu consulta
          </Typography>

          <Box className="contact__fields">
            <TextField
              label="Nombre"
              name="nombre"
              autoComplete="name"
              required
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
              disabled={enviando}
              fullWidth
            />
            <TextField
              label="Correo electrónico"
              name="correo"
              type="email"
              autoComplete="email"
              required
              error={Boolean(errors.correo)}
              helperText={errors.correo}
              disabled={enviando}
              fullWidth
            />
            <TextField
              label="Teléfono (opcional)"
              name="telefono"
              type="tel"
              autoComplete="tel"
              disabled={enviando}
              fullWidth
            />
            <TextField
              label="Asunto"
              name="asunto"
              required
              error={Boolean(errors.asunto)}
              helperText={errors.asunto}
              disabled={enviando}
              fullWidth
            />
            <TextField
              className="contact__message"
              label="Mensaje"
              name="mensaje"
              multiline
              minRows={5}
              required
              error={Boolean(errors.mensaje)}
              helperText={errors.mensaje}
              disabled={enviando}
              fullWidth
            />
          </Box>

          {notice && (
            <Alert
              severity={notice.severity}
              role="status"
              className="contact__notice"
            >
              {notice.texto}
            </Alert>
          )}

          <Button
            type="submit"
            size="lg"
            className="contact__submit"
            disabled={enviando}
          >
            {enviando ? 'Enviando…' : 'Enviar consulta'}
          </Button>
          <Typography component="p" className="contact__form-note">
            Los campos marcados son obligatorios.
          </Typography>
        </Box>
      </Box>
    </Section>
  )
}

export default Contacto
