import { useState } from 'react'
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
import { Link, NavLink, Outlet } from 'react-router-dom'
import Container from './Container'
import Footer from './Footer'
import { FOOTER_BRAND, FOOTER_COLUMNS } from '../../data/footer'
import logo from '../../assets/logo/logo-icon.png'
import theme from '../../theme'
import '../../styles/base/tokens.css'
import '../../styles/base/base.css'
import '../../styles/layout/AdminLayout.css'

const enlaces = [
  { label: 'Inicio', to: '/admin', end: true },
  { label: 'Categorías', to: '/admin/categorias' },
  { label: 'Publicaciones', to: '/admin/publicaciones' },
]

const claseEnlace = ({ isActive }) =>
  isActive ? 'admin-nav__link admin-nav__link--active' : 'admin-nav__link'

function AdminLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

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
                    Fitness Gym
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
              </Box>

              <IconButton
                aria-label="Abrir menú"
                aria-controls="admin-navigation"
                aria-expanded={menuAbierto}
                onClick={() => setMenuAbierto(true)}
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
          </Box>
        </Drawer>

        <main>
          <Outlet />
        </main>

        {/* Mismo pie que el sitio público: contenido compartido en data/footer */}
        <Footer
          logo={logo}
          brandName={FOOTER_BRAND.brandName}
          description={FOOTER_BRAND.description}
          columns={FOOTER_COLUMNS}
          bottomNote={FOOTER_BRAND.bottomNote}
        />
      </div>
    </ThemeProvider>
  )
}

export default AdminLayout
