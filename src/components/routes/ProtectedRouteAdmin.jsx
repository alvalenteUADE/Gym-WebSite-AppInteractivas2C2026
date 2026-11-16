import { Navigate } from 'react-router-dom';

export const ProtectedRouteAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // Si no hay token o el rol no es estricta y únicamente 'admin', lo redirigimos al login
  if (!token || rol !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};