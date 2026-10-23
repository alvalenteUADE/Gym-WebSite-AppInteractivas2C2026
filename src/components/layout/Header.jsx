import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Button from '../ui/Button'
import Container from './Container'
import '../../styles/layout/Header.css'

function Header({
  logo,
  brandName,
  links = [],
  ctaLabel,
  ctaHref = '#contacto',
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 68, md: 76 } }}
        >
          <Box
            component="a"
            href="#inicio"
            className="header__brand"
            aria-label={`${brandName} - Inicio`}
            onClick={closeMenu}
          >
            {logo && (
              <Box
                component="img"
                src={logo}
                alt=""
                aria-hidden="true"
                className="header__brand-logo"
              />
            )}
            <Box component="span" className="header__brand-name">
              {brandName}
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
              {links.map((link) => (
                <Box component="li" key={link.href}>
                  <Box
                    component="a"
                    href={link.href}
                    className="header__link"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Box>
                </Box>
              ))}
            </Box>

            {ctaLabel && (
              <Button href={ctaHref} size="sm" onClick={closeMenu}>
                {ctaLabel}
              </Button>
            )}
          </Box>

          <IconButton
            aria-label="Abrir menú"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto' }}
          >
            <Box
              component="span"
              className="header__menu-icon"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </Box>
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={closeMenu}
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
            <Box component="span" className="header__brand-name">
              {brandName}
            </Box>

            <IconButton aria-label="Cerrar menú" onClick={closeMenu}>
              <Box
                component="span"
                className="header__close-icon"
                aria-hidden="true"
              >
                ×
              </Box>
            </IconButton>
          </Box>

          <List id="mobile-navigation" disablePadding>
            {links.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component="a"
                  href={link.href}
                  onClick={closeMenu}
                  sx={{ borderRadius: 2, px: 1.5, py: 1.25 }}
                >
                  <ListItemText
                    primary={link.label}
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

          {ctaLabel && (
            <Button
              href={ctaHref}
              fullWidth
              sx={{ mt: 3 }}
              onClick={closeMenu}
            >
              {ctaLabel}
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header
