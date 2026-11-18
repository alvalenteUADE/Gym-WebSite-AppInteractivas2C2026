import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'
import logo from '../../assets/logo/logo-icon.png'
import theme from '../../theme'
import { obtenerInstitucion } from '../../services/institution.service'
import '../../styles/base/tokens.css'
import '../../styles/base/base.css'
import '../../styles/layout/PublicLayout.css'

const enlaces = [
  { label: 'Inicio', to: '/#inicio', hash: true },
  { label: 'Actividades', to: '/#actividades', hash: true },
  { label: 'Planes', to: '/#planes', hash: true },
  { label: 'Contacto', to: '/#contacto', hash: true },
]

function PublicLayout() {
  const [institucion, setInstitucion] = useState(null)

  useEffect(() => {
    const cargarDatosInstitucion = async () => {
      try {
        const data = await obtenerInstitucion()
        if (data) {
          setInstitucion(data)
        }
      } catch (error) {
        console.error('Error al cargar la información institucional en el PublicLayout:', error)
      }
    }

    cargarDatosInstitucion()
  }, [])

  const nombreGym = institucion?.nombre || 'Fitness Gym'
  const direccionGym = institucion?.direccion || 'Av. Corrientes 1234, CABA'
  const telefonoGym = institucion?.telefono || '011-4555-1234'
  const descripcionGym =
    institucion?.descripcion ||
    'Un espacio para entrenar, progresar y sentirte mejor. Equipamiento, clases y acompañamiento profesional.'
  const redesGym =
    institucion?.redes_sociales || institucion?.redesSociales || 'Instagram @fitnessgym'

  const horariosCrudos = institucion?.horarios_atencion || institucion?.horariosAtencion
  const horarioTexto = Array.isArray(horariosCrudos)
    ? horariosCrudos.join(' · ')
    : horariosCrudos || 'De Lunes a Viernes, de 07:00 a 23:00 hs'

  const esUrlRed =
    typeof redesGym === 'string' &&
    (redesGym.startsWith('http://') || redesGym.startsWith('https://'))
  const hrefRed = esUrlRed ? redesGym : 'https://www.instagram.com'

  const footerColumns = [
    {
      title: 'Explorar',
      items: [
        { label: 'Inicio', href: '/' },
        { label: 'Beneficios', href: '/publicaciones' },
        { label: 'Contacto', href: '/#contacto' },
      ],
    },
    {
      title: 'Contacto',
      items: [
        { label: direccionGym },
        { label: telefonoGym, href: `tel:${telefonoGym.replace(/[^0-9+]/g, '')}` },
        { label: horarioTexto },
      ],
    },
    {
      title: 'Seguinos',
      items: [
        {
          label: redesGym,
          href: hrefRed,
          external: true,
        },
      ],
    },
    {
      title: 'Gestión',
      items: [{ label: 'Acceso Admin', href: '/admin/login' }],
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="publico">
        <NavBar
          brandName={nombreGym}
          links={enlaces}
          ctaLabel="Empezá hoy"
          ctaTo="/publicaciones"
        />

        <main>
          <Outlet />
        </main>

        <Footer
          logo={logo}
          brandName={nombreGym}
          description={descripcionGym}
          columns={footerColumns}
          bottomNote={`${nombreGym} · ${direccionGym}`}
        />
      </div>
    </ThemeProvider>
  )
}

export default PublicLayout
