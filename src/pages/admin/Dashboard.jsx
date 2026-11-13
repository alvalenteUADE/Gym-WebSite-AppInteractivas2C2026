import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MuiButton from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Section from '../../components/layout/Section'
import '../../styles/pages/Dashboard.css'

// DATOS MOCKEADOS -----------------------------------------------------------
// Placeholders hasta la etapa de integración con el backend.
// Al conectar la API, estas métricas salen de:
//   GET /api/publicacion  -> total, activas y destacadas
//   GET /api/category     -> total de categorías
//   GET /api/consulta     -> consultas por estado
const metricas = [
  { id: 'publicaciones', valor: '20', label: 'Publicaciones', detalle: '18 activas · 2 dadas de baja' },
  { id: 'categorias', valor: '5', label: 'Categorías', detalle: 'Todas con publicaciones asociadas' },
  { id: 'consultas', valor: '7', label: 'Consultas pendientes', detalle: '3 leídas · 12 respondidas' },
  { id: 'destacadas', valor: '4', label: 'Publicaciones destacadas', detalle: 'Visibles en la portada del sitio' },
]

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
    to: null,
    tag: 'Contacto',
    titulo: 'Consultas',
    descripcion:
      'Revisá los mensajes recibidos desde el formulario de contacto y seguí su estado hasta responderlos.',
    accion: 'Ver consultas',
  },
  {
    id: 'institucion',
    to: null,
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

// Las tarjetas se muestran en orden alfabético. Se ordena acá, al renderizar,
// para que el orden se mantenga aunque después se sumen secciones al array.
// 'es' hace que los acentos y la ñ se comparen como corresponde en español.
const seccionesOrdenadas = [...secciones].sort((a, b) =>
  a.titulo.localeCompare(b.titulo, 'es'),
)

const actividad = [
  { id: 1, texto: 'Nueva consulta de Martina Ríos por el plan Full', cuando: 'Hace 2 horas' },
  { id: 2, texto: 'Se publicó «Clase de funcional - turno noche»', cuando: 'Ayer' },
  { id: 3, texto: 'Se actualizaron los horarios de atención', cuando: 'Hace 3 días' },
  { id: 4, texto: 'Se dio de baja «Abono trimestral cardio»', cuando: 'Hace 5 días' },
]
// ---------------------------------------------------------------------------

// El tema, la barra de navegación y el pie los aporta AdminLayout.
function Dashboard() {
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

      <Section
        id="actividad"
        eyebrow="Actividad"
        title="Últimos movimientos"
        description="Un repaso de los cambios más recientes sobre el contenido del sitio."
      >
        <Box component="ul" className="admin__activity">
          {actividad.map((item) => (
            <Box component="li" className="admin__activity-item" key={item.id}>
              <Box component="span" className="admin__activity-mark" aria-hidden="true" />
              <Box className="admin__activity-content">
                <Typography component="span" className="admin__activity-text">
                  {item.texto}
                </Typography>
                <Typography component="span" className="admin__activity-when">
                  {item.cuando}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Section>
    </>
  )
}

export default Dashboard
