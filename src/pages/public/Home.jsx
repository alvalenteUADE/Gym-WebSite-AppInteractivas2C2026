import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import Hero from '../../components/layout/Hero'
import Section from '../../components/layout/Section'
import PlanCard from '../../components/ui/PlanCard'
import ServiceCard from '../../components/ui/ServiceCard'
import logo from '../../assets/logo/logo-icon.png'
import heroImage from '../../assets/fondos/background6.jpg'
import strengthImage from '../../assets/equipo/1.jpg'
import cardioImage from '../../assets/equipo/3.jpg'
import personalImage from '../../assets/equipo/8.jpg'
import Contacto from './Contacto'
import theme from '../../theme'
import '../../styles/base/tokens.css'
import '../../styles/base/base.css'
import '../../styles/pages/Home.css'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Actividades', href: '#actividades' },
  { label: 'Planes', href: '#planes' },
  { label: 'Contacto', href: '#contacto' },
]

const heroStats = [
  { value: '7 a 23 h', label: 'Lunes a viernes' },
  { value: '+20', label: 'Clases por semana' },
  { value: '1 a 1', label: 'Entrenamiento personal' },
]

const services = [
  {
    tag: 'Sala principal',
    title: 'Fuerza y musculación',
    description:
      'Rutinas progresivas y equipamiento completo para ganar fuerza con una técnica segura.',
    image: strengthImage,
    imageAlt: 'Socio entrenando con pesas en Fitness Gym',
    href: '#planes',
    linkLabel: 'Ver planes',
  },
  {
    tag: 'Clases grupales',
    title: 'Funcional y cardio',
    description:
      'Circuitos dinámicos y trabajo cardiovascular para mejorar tu resistencia y movilidad.',
    image: cardioImage,
    imageAlt: 'Entrenamiento cardiovascular en Fitness Gym',
    href: '#planes',
    linkLabel: 'Ver planes',
  },
  {
    tag: 'Uno a uno',
    title: 'Entrenamiento personal',
    description:
      'Un entrenador te acompaña con un plan adaptado a tus objetivos, tiempos y experiencia.',
    image: personalImage,
    imageAlt: 'Entrenador acompañando a un socio en Fitness Gym',
    href: '#contacto',
    linkLabel: 'Coordinar una entrevista',
  },
]

const plans = [
  {
    name: 'Pase libre',
    description:
      'Para moverte a tu ritmo y usar el gimnasio cuando quieras.',
    price: 'Consultar',
    period: 'Valor mensual',
    features: [
      'Acceso a sala de musculación',
      'Clases grupales',
      'Horario extendido',
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

const benefits = [
  {
    title: 'Equipamiento completo',
    text: 'Sala de fuerza, cardio y espacio funcional.',
  },
  {
    title: 'Entrenadores certificados',
    text: 'Profesionales que te acompañan en cada etapa.',
  },
  {
    title: 'Horario extendido',
    text: 'Lunes a viernes de 7 a 23 h y sábados de 9 a 20 h.',
  },
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
      { label: 'Av. Corrientes 1234, CABA' },
      { label: '011-4555-1234', href: 'tel:+541145551234' },
      { label: 'Lun a Vie 7–23 h · Sáb 9–20 h' },
    ],
  },
  {
    title: 'Seguinos',
    items: [
      {
        label: 'Instagram @fitnessgym',
        href: 'https://www.instagram.com/fitnessgym',
        external: true,
      },
      {
        label: 'Facebook /fitnessgym',
        href: 'https://www.facebook.com/fitnessgym',
        external: true,
      },
    ],
  },
]

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="home">
        <Header
          logo={logo}
          brandName="Fitness Gym"
          links={navigation}
          ctaLabel="Empezá hoy"
          ctaHref="#planes"
        />

        <main>
          <Hero
            eyebrow="Fitness Gym · Av. Corrientes 1234"
            title="Entrená con propósito."
            highlight="Sentite mejor."
            description="Equipamiento de última generación, clases grupales y entrenadores que te acompañan para que entrenar sea parte de tu rutina."
            primaryAction={{ label: 'Ver planes', href: '#planes' }}
            secondaryAction={{
              label: 'Conocer actividades',
              href: '#actividades',
            }}
            image={heroImage}
            imageAlt="Sala de entrenamiento de Fitness Gym"
            badge={{
              label: 'Horarios',
              value: 'Lun a Vie 7–23 h · Sáb 9–20 h',
            }}
            stats={heroStats}
          />
          <Contacto />
        </main>

        <Footer
          logo={logo}
          brandName="Fitness Gym"
          description="Un espacio para entrenar, progresar y sentirte mejor. Equipamiento, clases y acompañamiento profesional."
          columns={footerColumns}
          bottomNote="Fitness Gym · Av. Corrientes 1234, CABA"
        />
      </div>
    </ThemeProvider>
  )
}

export default Home
