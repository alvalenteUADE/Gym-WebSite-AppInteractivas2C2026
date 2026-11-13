import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout.jsx'
import Home from './pages/public/Home.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminCategorias from './pages/admin/AdminCategorias.jsx'
import AdminPublicaciones from './pages/admin/AdminPublicaciones.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Sitio público */}
        <Route path="/" element={<Home />} />

        {/* Panel de administración.
            AdminLayout aporta el tema, la barra de navegación y el pie;
            cada pantalla se renderiza en su <Outlet />. */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="publicaciones" element={<AdminPublicaciones />} />

          {/* Una URL inexistente bajo /admin vuelve al inicio del panel */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Cualquier otra URL vuelve al inicio del sitio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
