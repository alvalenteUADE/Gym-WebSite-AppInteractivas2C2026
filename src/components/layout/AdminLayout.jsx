import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MuiButton from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Container from './Container'
import Footer from './Footer'
import logo from '../../assets/logo/logo-icon.png'
import theme from '../../theme'
import { cerrarSesionService } from '../../services/auth.service'
import { obtenerInstitucion } from '../../services/institution.service'
import '../../styles/base/tokens.css'
import '../../styles/base/base.css'
import '../../styles/layout/AdminLayout.css'

const enlaces = [
  { label: 'Inicio', to: '/admin', end: true },
  { label: 'Categorías', to: '/admin/categorias' },
  { label: 'Publicaciones', to: '/admin/publicaciones' },
  { label: 'Consultas', to: '/admin/consultas' },
  { label: 'Institución', to: '/admin/institucion' },
  { label: 'Perfil', to: '/admin/perfil' },
]

const claseEnlace = ({ isActive }) =>
  isActive ? 'admin-nav__link admin-nav__link--active' : 'admin-nav__link'

function AdminLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [institucion, setInstitucion] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const cargarDatosInstitucion = async () => {
      try {
        const data = await obtenerInstitucion()
        if (data) {
          setInstitucion(data)
        }
      } catch (error) {
        console.error('Error al cargar la información institucional en el AdminLayout:', error)
      }
    }

    cargarDatosInstitucion()
  }, [])

  const cerrarMenu = () => setMenuAbierto(false)

  const cerrarSesion = async () => {
    cerrarMenu()

    try {
      await cerrarSesionService()
    } catch (error) {
      console.error('Error al cerrar la sesión:', error)
    } finally {
      navigate('/admin/login', { replace: true })
    }
  }

  // Datos dinámicos con respaldo por defecto
  const nombreGym = institucion?.nombre || 'Fitness Gym'
  const direccionGym = institucion?.direccion || 'Av. Corrientes 1234, CABA'
  const telefonoGym = institucion?.telefono || '011-4555-1234'
  const descripcionGym = institucion?.descripcion || 'Un espacio para entrenar, progresar y sentirte mejor. Equipamiento, clases y acompañamiento profesional.'
  const redesGym = institucion?.redes_sociales || institucion?.redesSociales || 'Instagram @fitnessgym'
  
  const horariosCrudos = institucion?.horarios_atencion || institucion?.horariosAtencion
  const horarioTexto = Array.isArray(horariosCrudos) ? horariosCrudos.join(' · ') : (horariosCrudos || 'Lun a Vie 7–23 h · Sáb 9–20 h')

  // Verificamos si la red social es una URL o un texto descriptivo para ajustar el enlace dinámicamente
  const esUrlRed = typeof redesGym === 'string' && (redesGym.startsWith('http://') || redesGym.startsWith('https://'))
  const hrefRed = esUrlRed ? redesGym : 'https://www.instagram.com'

  // Columnas del footer para el panel de administración (sin la sección de Gestión / Acceso Admin)
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

      <div className="admin">
        <AppBar position="sticky">
          <Container>
            <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
              <Box
                component={Link}
                to="/admin"
                className="admin-nav__brand"
                aria-label="Fitness Gym - Inicio del panel"
                onClick={cerrarMenu}
              >
                <Box
                  component="img"
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  className="admin-nav__brand-logo"
                />
                <Box className="admin-nav__brand-text">
                  <Box component="span" className="admin-nav__brand-name">
                    {nombreGym}
                  </Box>
                  <Box component="span" className="admin-nav__brand-tag">
                    Panel de administración
                  </Box>
                </Box>
              </Box>

              <Box
                component="nav"
                aria-label="Navegación del panel"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 3.5,
                  ml: 'auto',
                }}
              >
                <Box
                  component="ul"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3.5,
                    m: 0,
                    p: 0,
                    listStyle: 'none',
                  }}
                >
                  {enlaces.map((enlace) => (
                    <Box component="li" key={enlace.to}>
                      <NavLink
                        to={enlace.to}
                        end={enlace.end}
                        className={claseEnlace}
                      >
                        {enlace.label}
                      </NavLink>
                    </Box>
                  ))}
                </Box>

                <MuiButton component={Link} to="/" size="small">
                  Ver el sitio
                </MuiButton>

                <MuiButton size="small" onClick={cerrarSesion}>
                  Cerrar sesión
                </MuiButton>
              </Box>

              <IconButton
                aria-label="Abrir menú"
                aria-controls="admin-navigation"
                aria-expanded={menuAbierto}
                onClick={(e) => {
                  e.currentTarget.blur()
                  setMenuAbierto(true)
                }}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto' }}
              >
                <Box
                  component="span"
                  className="admin-nav__menu-icon"
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                </Box>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        <Drawer
          anchor="right"
          open={menuAbierto}
          onClose={cerrarMenu}
          slotProps={{
            paper: {
              sx: {
                width: { xs: '100%', sm: 340 },
                backgroundColor: 'background.default',
                backgroundImage: 'none',
              },
            },
          }}
        >
          <Box
            role="presentation"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100%',
              p: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box component="span" className="admin-nav__brand-name">
                Panel
              </Box>

              <IconButton aria-label="Cerrar menú" onClick={cerrarMenu}>
                <Box
                  component="span"
                  className="admin-nav__close-icon"
                  aria-hidden="true"
                >
                  ×
                </Box>
              </IconButton>
            </Box>

            <List id="admin-navigation" disablePadding>
              {enlaces.map((enlace) => (
                <ListItem key={enlace.to} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={enlace.to}
                    end={enlace.end}
                    onClick={cerrarMenu}
                    sx={{ borderRadius: 2, px: 1.5, py: 1.25 }}
                  >
                    <ListItemText
                      primary={enlace.label}
                      slotProps={{
                        primary: {
                          sx: { fontWeight: 600, color: 'text.primary' },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <MuiButton
              component={Link}
              to="/"
              fullWidth
              sx={{ mt: 3 }}
              onClick={cerrarMenu}
            >
              Ver el sitio
            </MuiButton>

            <MuiButton fullWidth sx={{ mt: 1 }} onClick={cerrarSesion}>
              Cerrar sesión
            </MuiButton>
          </Box>
        </Drawer>

        <main>
          <Outlet />
        </main>

        {/* Footer dinámico sincronizado con la base de datos (sin sección de gestión admin) */}
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

export default AdminLayout