import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import Hero from '../../components/layout/Hero'
import Contacto from './Contacto'
import theme from '../../theme'
import { obtenerInstitucion } from '../../services/institution.service'
import logo from '../../assets/logo/logo-icon.png'
import heroImage from '../../assets/fondos/5.jpg'
import '../../styles/base/tokens.css'
import '../../styles/base/base.css'
import '../../styles/pages/Home.css'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Actividades', href: '#actividades' },
  { label: 'Planes', href: '#planes' },
  { label: 'Contacto', href: '#contacto' },
]

function Home() {
  const [institucion, setInstitucion] = useState(null)

  useEffect(() => {
    const cargarDatosInstitucion = async () => {
      try {
        const data = await obtenerInstitucion()
        if (data) {
          setInstitucion(data)
        }
      } catch (error) {
        console.error('Error al cargar la información institucional en el Home:', error)
      }
    }

    cargarDatosInstitucion()
  }, [])

  // Datos dinámicos obtenidos de la BD con valores de respaldo (fallback)
  const nombreGym = institucion?.nombre || 'Fitness Gym'
  const direccionGym = institucion?.direccion || 'Av. Corrientes 1234, CABA'
  const telefonoGym = institucion?.telefono || '011-4555-1234'
  const descripcionGym = institucion?.descripcion || 'Un espacio para entrenar, progresar y sentirte mejor. Equipamiento, clases y acompañamiento profesional.'
  const redesGym = institucion?.redes_sociales || institucion?.redesSociales || 'Instagram @fitnessgym'
  
  // Manejo flexible de horarios
  const horariosCrudos = institucion?.horarios_atencion || institucion?.horariosAtencion
  const horarioTexto = Array.isArray(horariosCrudos) ? horariosCrudos.join(' · ') : (horariosCrudos || 'De Lunes a Viernes, de 07:00 a 23:00 hs')

  // Formateo exacto para que coincida con el estilo visual limpio (ej: "7 a 23 h" y "Lunes a viernes")
  let diasHero = 'Lunes a viernes'
  let horasHero = '7 a 23 h'

  if (typeof horarioTexto === 'string' && horarioTexto.trim() !== '') {
    const parteLunVie = horarioTexto.split(/[-·]/)[0].trim()
    const subPartes = parteLunVie.split(',')
    
    if (subPartes.length >= 2) {
      diasHero = subPartes[0].replace(/^de\s+/i, '').trim()
      horasHero = subPartes.slice(1).join(',').trim()
    } else {
      horasHero = parteLunVie
    }

    // Limpieza de formato para las horas (remueve el "de" inicial, ":00" y cambia "hs"/"horas" por "h")
    horasHero = horasHero
      .replace(/^de\s+/i, '')
      .replace(/:00/g, '')
      .replace(/\bhs\.?/gi, 'h')
      .replace(/\bhoras\b/gi, 'h')
      .trim()

    // Normalizamos la primera letra de los días en minúscula/mayúscula según el estándar visual
    diasHero = diasHero.charAt(0).toUpperCase() + diasHero.slice(1).toLowerCase()
  }

  // Estadísticas del Hero con el formato visual exacto
  const heroStats = [
    { value: horasHero, label: diasHero },
    { value: '+20', label: 'Clases por semana' },
    { value: '1 a 1', label: 'Entrenamiento personal' },
  ]

  const footerColumns = [
    {
      title: 'Explorar',
      items: [
        { label: 'Inicio', href: '#inicio' },
        { label: 'Actividades', href: '#actividades' },
        { label: 'Planes', href: '#planes' },
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
          href: 'https://www.instagram.com',
          external: true,
        },
      ],
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="home">
        <Header
          logo={logo}
          brandName={nombreGym}
          links={navigation}
          ctaLabel="Empezá hoy"
          ctaHref="#planes"
        />

        <main>
          <Hero
            eyebrow={`${nombreGym} · ${direccionGym}`}
            title="Entrená con propósito."
            highlight="Sentite mejor."
            description={descripcionGym}
            primaryAction={{ label: 'Ver planes', href: '#planes' }}
            secondaryAction={{
              label: 'Conocer actividades',
              href: '#actividades',
            }}
            image={heroImage}
            imageAlt="Sala de entrenamiento de Fitness Gym"
            badge={{
              label: 'Horarios',
              value: horarioTexto,
            }}
            stats={heroStats}
          />
          <Contacto 
            direccion={direccionGym}
            telefono={telefonoGym}
            horarios={horarioTexto}
          />
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

export default Home