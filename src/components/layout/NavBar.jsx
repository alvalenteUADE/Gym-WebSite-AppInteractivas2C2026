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
import { Link, NavLink } from 'react-router-dom'
import Container from './Container'
import logo from '../../assets/logo/logo-icon.png'
import '../../styles/layout/NavBar.css'

const claseEnlace = ({ isActive }) =>
  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'

function NavBar({
  brandName = 'Fitness Gym',
  tagline,
  brandTo = '/',
  links = [],
  ctaLabel,
  ctaTo,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <>
      <AppBar position="sticky">
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
            <Box
              component={Link}
              to={brandTo}
              className="navbar__brand"
              aria-label={`${brandName} - Inicio`}
              onClick={cerrarMenu}
            >
              <Box
                component="img"
                src={logo}
                alt=""
                aria-hidden="true"
                className="navbar__brand-logo"
              />
              <Box className="navbar__brand-text">
                <Box component="span" className="navbar__brand-name">
                  {brandName}
                </Box>
                {tagline && (
                  <Box component="span" className="navbar__brand-tag">
                    {tagline}
                  </Box>
                )}
              </Box>
            </Box>

            <Box
              component="nav"
              aria-label="Navegación principal"
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
                {links.map((enlace) => (
                  <Box component="li" key={enlace.to}>
                    {enlace.hash ? (
                      <Box
                        component="a"
                        href={enlace.to}
                        className="navbar__link"
                        onClick={cerrarMenu}
                      >
                        {enlace.label}
                      </Box>
                    ) : (
                      <NavLink
                        to={enlace.to}
                        end={enlace.end}
                        className={claseEnlace}
                      >
                        {enlace.label}
                      </NavLink>
                    )}
                  </Box>
                ))}
              </Box>

              {ctaLabel && ctaTo && (
                <MuiButton component={Link} to={ctaTo} size="small">
                  {ctaLabel}
                </MuiButton>
              )}
            </Box>

            <IconButton
              aria-label="Abrir menú"
              aria-controls="navegacion-mobile"
              aria-expanded={menuAbierto}
              onClick={() => setMenuAbierto(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto' }}
            >
              <Box
                component="span"
                className="navbar__menu-icon"
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
            <Box component="span" className="navbar__brand-name">
              {brandName}
            </Box>

            <IconButton aria-label="Cerrar menú" onClick={cerrarMenu}>
              <Box
                component="span"
                className="navbar__close-icon"
                aria-hidden="true"
              >
                ×
              </Box>
            </IconButton>
          </Box>

          <List id="navegacion-mobile" disablePadding>
            {links.map((enlace) => (
              <ListItem key={enlace.to} disablePadding>
                <ListItemButton
                  component={enlace.hash ? 'a' : NavLink}
                  {...(enlace.hash ? { href: enlace.to } : { to: enlace.to, end: enlace.end })}
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

          {ctaLabel && ctaTo && (
            <MuiButton
              component={Link}
              to={ctaTo}
              fullWidth
              sx={{ mt: 3 }}
              onClick={cerrarMenu}
            >
              {ctaLabel}
            </MuiButton>
          )}
        </Box>
      </Drawer>
    </>
  )
}

export default NavBar
