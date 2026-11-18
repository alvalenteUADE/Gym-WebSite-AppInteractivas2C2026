import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout.jsx'
import PublicLayout from './components/layout/PublicLayout.jsx'
import Home from './pages/public/Home.jsx'
import Publicaciones from './pages/public/Publicaciones.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminCategorias from './pages/admin/AdminCategorias.jsx'
import AdminPublicaciones from './pages/admin/AdminPublicaciones.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PublicLayout />}>
          <Route path="/publicaciones" element={<Publicaciones />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="publicaciones" element={<AdminPublicaciones />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
