import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout.jsx'
import PublicLayout from './components/layout/PublicLayout.jsx'
import Home from './pages/public/Home.jsx'
import Publicaciones from './pages/public/Publicaciones.jsx'
import { Register } from './pages/public/Register.jsx'
import { Login } from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminCategorias from './pages/admin/AdminCategorias.jsx'
import AdminConsultas from './pages/admin/AdminConsultas.jsx'
import AdminPublicaciones from './pages/admin/AdminPublicaciones.jsx'
import { AdminInstitucion } from './pages/admin/AdminInstitucion.jsx' // <--- 1. IMPORTAMOS EL COMPONENTE
import { ProtectedRouteAdmin } from './components/routes/ProtectedRouteAdmin.jsx'
import ScrollToHash from './components/routes/ScrollToHash.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PublicLayout />}>
          <Route path="/publicaciones" element={<Publicaciones />} />
        </Route>

        {/* Ruta explícita para el Login de Admin (pública) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Panel de administración protegido con el Rol de Admin */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRouteAdmin>
              <AdminLayout />
            </ProtectedRouteAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="consultas" element={<AdminConsultas />} />
          <Route path="publicaciones" element={<AdminPublicaciones />} />
          <Route path="institucion" element={<AdminInstitucion />} /> {/* <--- 2. AGREGAMOS LA RUTA ANIDADA */}

          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)