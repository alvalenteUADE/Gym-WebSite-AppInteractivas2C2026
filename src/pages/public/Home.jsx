import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Button from '../../components/ui/Button'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import Hero from '../../components/layout/Hero'
import PlanCard from '../../components/ui/PlanCard'
import Section from '../../components/layout/Section'
import ServiceCard from '../../components/ui/ServiceCard'
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

const activities = [
  {
    tag: 'Clases grupales',
    title: 'Funcional',
    description:
      'Circuitos con peso corporal, kettlebells y TRX para ganar fuerza, resistencia y movilidad.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&fm=webp&fit=crop',
    imageAlt: 'Entrenamiento funcional en Fitness Gym',
    href: '/publicaciones',
    linkLabel: 'Ver actividad',
  },
  {
    tag: 'Cardio',
    title: 'Clase de Spinning',
    description:
      '45 minutos de alta intensidad sobre bicicleta fija, con música y acompañamiento de un instructor.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80&fm=webp&fit=crop',
    imageAlt: 'Clase grupal de spinning en Fitness Gym',
    href: '/publicaciones',
    linkLabel: 'Ver actividad',
  },
  {
    tag: 'Uno a uno',
    title: 'Entrenamiento personal',
    description:
      'Un entrenador certificado te acompaña con un plan adaptado a tus objetivos, tiempos y experiencia.',
    image:
      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1200&q=80&fm=webp&fit=crop',
    imageAlt: 'Sesión de entrenamiento personal en Fitness Gym',
    href: '/publicaciones',
    linkLabel: 'Ver actividad',
  },
]

const plans = [
  {
    name: 'Pase libre',
    description: 'Para moverte a tu ritmo y usar el gimnasio cuando quieras.',
    price: 'Consultar',
    period: 'Valor mensual',
    features: [
      'Acceso a sala de musculación',
      'Clases grupales',
      'Sector cardio',
      'Vestuarios y lockers',
    ],
    ctaLabel: 'Consultar disponibilidad',
  },
  {
    name: 'Full',
    description:
      'El equilibrio entre libertad y acompañamiento para sostener tus resultados.',
    price: 'Consultar',
    period: 'Valor mensual',
    features: [
      'Todo lo del Pase libre',
      'Plan de entrenamiento mensual',
      'Seguimiento de progreso',
      'Acceso a todas las clases',
    ],
    highlighted: true,
    badge: 'Más elegido',
    ctaLabel: 'Quiero este plan',
  },
  {
    name: 'Personalizado',
    description:
      'Acompañamiento cercano para objetivos específicos y entrenamiento 1 a 1.',
    price: 'A medida',
    period: 'Según objetivos',
    features: [
      'Todo lo del plan Full',
      'Entrenador personal',
      'Asesoramiento nutricional',
      'Plan adaptado a tus tiempos',
    ],
    ctaLabel: 'Hablar con el equipo',
  },
]

function Home() {
  const [institucion, setInstitucion] = useState(null)
  const [consultaPlan, setConsultaPlan] = useState(null)

  const handleSeleccionPlan = (plan) => (event) => {
    event.preventDefault()

    setConsultaPlan({
      asunto: `Consulta sobre el plan ${plan.name}`,
      mensaje: `Hola, quisiera consultar por el plan ${plan.name}. ${plan.description} ¿Podrían enviarme más detalles sobre el valor y cómo puedo sumarme? Gracias.`,
    })

    document.getElementById('contacto')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

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
    
    // Verificamos si incluye coma (formato nuevo) o si usa espacio (formato seeder viejo)
    if (parteLunVie.includes(',')) {
      const subPartes = parteLunVie.split(',')
      diasHero = subPartes[0].replace(/^de\s+/i, '').trim()
      horasHero = subPartes.slice(1).join(',').trim()
    } else {
      // Intento de rescate para formatos estilo seeder sin coma
      const matchHora = parteLunVie.match(/\d{1,2}(?::\d{2})?/)
      if (matchHora && matchHora.index > 0) {
        diasHero = parteLunVie.substring(0, matchHora.index).replace(/^de\s+/i, '').trim()
        horasHero = parteLunVie.substring(matchHora.index).trim()
      } else {
        horasHero = parteLunVie
      }
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

  // Validación dinámica del enlace de redes sociales para evitar que apunte siempre a la home genérica
  const esUrlRed = typeof redesGym === 'string' && (redesGym.startsWith('http://') || redesGym.startsWith('https://'))
  const hrefRed = esUrlRed ? redesGym : 'https://www.instagram.com'

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
          href: hrefRed,
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
          ctaHref="/publicaciones"
        />

        <main>
          <Hero
            eyebrow={`${nombreGym} · ${direccionGym}`}
            title="Entrená con propósito."
            highlight="Sentite mejor."
            description={descripcionGym}
            primaryAction={{ label: 'Empezá hoy', href: '/publicaciones' }}
            image={heroImage}
            imageAlt="Sala de entrenamiento de Fitness Gym"
            badge={{
              label: 'Horarios',
              value: horarioTexto,
            }}
            stats={heroStats}
          />

          <Section
            id="actividades"
            eyebrow="Actividades"
            title="Movete como más te guste."
            description="Un adelanto de todo lo que podés entrenar. Descubrí el listado completo desde Empezá hoy."
            tone="muted"
          >
            <div className="home__services-grid">
              {activities.map((activity) => (
                <ServiceCard key={activity.title} {...activity} />
              ))}
            </div>

            <Button
              className="home__all-activities"
              href="/publicaciones"
              variant="secondary"
            >
              Ver todas las actividades
              <span aria-hidden="true">→</span>
            </Button>
          </Section>

          <Section
            id="planes"
            eyebrow="Planes"
            title="Elegí cómo querés entrenar."
            description="Opciones para empezar, sostener el ritmo o llevar tu entrenamiento al siguiente nivel."
          >
            <div className="home__plans-grid">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  {...plan}
                  onCtaClick={handleSeleccionPlan(plan)}
                />
              ))}
            </div>
          </Section>

          <Contacto
            direccion={direccionGym}
            telefono={telefonoGym}
            horarios={horarioTexto}
            consultaPredefinida={consultaPlan}
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