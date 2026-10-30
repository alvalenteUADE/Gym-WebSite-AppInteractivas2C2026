import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '../../components/ui/Button'
import Section from '../../components/layout/Section'
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
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setNotice('El envío de consultas estará disponible próximamente.')
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
          onSubmit={handleSubmit}
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
              fullWidth
            />
            <TextField
              label="Correo electrónico"
              name="correo"
              type="email"
              autoComplete="email"
              required
              fullWidth
            />
            <TextField
              label="Teléfono (opcional)"
              name="telefono"
              type="tel"
              autoComplete="tel"
              fullWidth
            />
            <TextField
              label="Asunto"
              name="asunto"
              required
              fullWidth
            />
            <TextField
              className="contact__message"
              label="Mensaje"
              name="mensaje"
              multiline
              minRows={5}
              required
              fullWidth
            />
          </Box>

          {notice && (
            <Alert severity="info" role="status" className="contact__notice">
              {notice}
            </Alert>
          )}

          <Button type="submit" size="lg" className="contact__submit">
            Enviar consulta
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
