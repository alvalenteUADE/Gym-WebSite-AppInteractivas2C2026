import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MuiButton from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Section from '../../components/layout/Section'
import { useCategorias } from '../../hooks/useCategorias'
import { useConsultas } from '../../hooks/useConsultas'
import { usePublicaciones } from '../../hooks/usePublicaciones'
import '../../styles/pages/Dashboard.css'

const secciones = [
  {
    id: 'publicaciones',
    to: '/admin/publicaciones',
    tag: 'Catálogo',
    titulo: 'Publicaciones',
    descripcion:
      'Cargá productos y servicios, asignales categoría, precio e imágenes, y dalos de alta o de baja.',
    accion: 'Administrar publicaciones',
  },
  {
    id: 'categorias',
    to: '/admin/categorias',
    tag: 'Catálogo',
    titulo: 'Categorías',
    descripcion:
      'Creá y renombrá las categorías con las que se agrupan y filtran las publicaciones del sitio.',
    accion: 'Administrar categorías',
  },
  {
    id: 'consultas',
    to: '/admin/consultas',
    tag: 'Contacto',
    titulo: 'Consultas',
    descripcion:
      'Revisá los mensajes recibidos desde el formulario de contacto y seguí su estado hasta responderlos.',
    accion: 'Ver consultas',
  },
  {
    id: 'institucion',
    to: '/admin/institucion',
    tag: 'Comercio',
    titulo: 'Información institucional',
    descripcion:
      'Actualizá el nombre, la descripción, la dirección, el teléfono, los horarios y las redes del gimnasio.',
    accion: 'Editar información',
  },
  {
    id: 'perfil',
    to: null,
    tag: 'Cuenta',
    titulo: 'Mi perfil',
    descripcion:
      'Modificá tus datos personales de administrador y la dirección de correo con la que iniciás sesión.',
    accion: 'Editar perfil',
  },
]


const seccionesOrdenadas = [...secciones].sort((a, b) =>
  a.titulo.localeCompare(b.titulo, 'es'),
)

function Dashboard() {
  const {
    publicaciones,
    cargando: cargandoPublicaciones,
    errorCarga: errorPublicaciones,
  } = usePublicaciones()
  const {
    categorias,
    cargando: cargandoCategorias,
    errorCarga: errorCategorias,
  } = useCategorias()
  const {
    consultas,
    cargando: cargandoConsultas,
    errorCarga: errorConsultas,
  } = useConsultas()

  const metricas = useMemo(() => {
    const activas = publicaciones.filter((item) => item.activa).length
    const dadasDeBaja = publicaciones.length - activas
    const destacadas = publicaciones.filter((item) => item.destacada).length

    const categoriasEnUso = new Set(
      publicaciones
        .map((item) => item.categoria?._id)
        .filter(Boolean),
    ).size
    const categoriasSinUso = Math.max(categorias.length - categoriasEnUso, 0)

    const pendientes = consultas.filter(
      (item) => item.estado === 'Pendiente',
    ).length
    const leidas = consultas.filter((item) => item.estado === 'Leída').length
    const respondidas = consultas.filter(
      (item) => item.estado === 'Respondida',
    ).length

    const valor = (cargando, error, cantidad) => {
      if (cargando) return '…'
      if (error) return '—'

      return String(cantidad)
    }

    const detalle = (cargando, error, texto) => {
      if (cargando) return 'Cargando…'
      if (error) return 'No se pudieron cargar'

      return texto
    }

    return [
      {
        id: 'publicaciones',
        valor: valor(
          cargandoPublicaciones,
          errorPublicaciones,
          publicaciones.length,
        ),
        label: 'Publicaciones',
        detalle: detalle(
          cargandoPublicaciones,
          errorPublicaciones,
          `${activas} activas · ${dadasDeBaja} dadas de baja`,
        ),
      },
      {
        id: 'categorias',
        valor: valor(cargandoCategorias, errorCategorias, categorias.length),
        label: 'Categorías',
        detalle: detalle(
          cargandoCategorias,
          errorCategorias,
          `${categoriasEnUso} con publicaciones · ${categoriasSinUso} sin publicaciones`,
        ),
      },
      {
        id: 'consultas',
        valor: valor(cargandoConsultas, errorConsultas, pendientes),
        label: 'Consultas pendientes',
        detalle: detalle(
          cargandoConsultas,
          errorConsultas,
          `${leidas} leídas · ${respondidas} respondidas`,
        ),
      },
      {
        id: 'destacadas',
        valor: valor(
          cargandoPublicaciones,
          errorPublicaciones,
          destacadas,
        ),
        label: 'Publicaciones destacadas',
        detalle: detalle(
          cargandoPublicaciones,
          errorPublicaciones,
          `${destacadas} de ${publicaciones.length} publicaciones`,
        ),
      },
    ]
  }, [
    publicaciones,
    cargandoPublicaciones,
    errorPublicaciones,
    categorias,
    cargandoCategorias,
    errorCategorias,
    consultas,
    cargandoConsultas,
    errorConsultas,
  ])

  return (
    <>
      <Section
        id="resumen"
        eyebrow="Panel de administración"
        title="Hola de nuevo."
        description="Desde acá administrás el contenido que ven los visitantes del sitio: las publicaciones, sus categorías, la información del gimnasio y las consultas que llegan por el formulario de contacto."
      >
        <Box className="admin__metrics">
          {metricas.map((metrica) => (
            <Card className="admin__metric" elevation={0} key={metrica.id}>
              <CardContent className="admin__metric-body">
                <Typography component="strong" className="admin__metric-value">
                  {metrica.valor}
                </Typography>
                <Typography component="span" className="admin__metric-label">
                  {metrica.label}
                </Typography>
                <Typography component="span" className="admin__metric-detail">
                  {metrica.detalle}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="gestion"
        eyebrow="Gestión"
        title="¿Qué querés administrar?"
        description="Cada sección agrupa las operaciones de alta, modificación y baja de una entidad del sistema."
        tone="muted"
      >
        <Box className="admin__cards">
          {seccionesOrdenadas.map((seccion) => (
            <Card className="admin__card" elevation={0} key={seccion.id}>
              <CardContent className="admin__card-body">
                <Typography component="span" className="admin__card-tag">
                  {seccion.tag}
                </Typography>
                <Typography component="h3" variant="h3" className="admin__card-title">
                  {seccion.titulo}
                </Typography>
                <Typography component="p" className="admin__card-description">
                  {seccion.descripcion}
                </Typography>
                {/* Las secciones sin pantalla todavía quedan deshabilitadas */}
                {seccion.to ? (
                  <MuiButton
                    component={Link}
                    to={seccion.to}
                    size="small"
                    variant="outlined"
                    className="admin__card-action"
                  >
                    {seccion.accion}
                  </MuiButton>
                ) : (
                  <MuiButton
                    size="small"
                    variant="outlined"
                    className="admin__card-action"
                    disabled
                  >
                    {seccion.accion}
                  </MuiButton>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Section>
    </>
  )
}

export default Dashboard
