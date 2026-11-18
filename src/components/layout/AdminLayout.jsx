import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'
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

function AdminLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="admin">
        <NavBar
          tagline="Panel de administración"
          brandTo="/admin"
          links={enlaces}
          ctaLabel="Ver el sitio"
          ctaTo="/"
        />

        <main>
          <Outlet />
        </main>

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
