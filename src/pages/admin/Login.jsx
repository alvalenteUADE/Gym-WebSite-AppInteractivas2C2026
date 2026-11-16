import { LoginForm } from '../../components/forms/LoginForm';
import Header from '../../components/layout/Header';
import logo from '../../assets/logo/logo-icon.png'; 

const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Actividades', href: '/#actividades' },
  { label: 'Planes', href: '/#planes' },
  { label: 'Contacto', href: '/#contacto' },
];

export const Login = () => {
  return (
    <div style={{ 
      background: 'radial-gradient(circle at top right, rgba(168, 218, 183, 0.35) 0%, transparent 60%), var(--color-bg)',
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header 
        logo={logo}
        brandName="Fitness Gym" 
        links={navigation} 
        brandHref="/"
      />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <LoginForm />
      </main>
    </div>
  );
};