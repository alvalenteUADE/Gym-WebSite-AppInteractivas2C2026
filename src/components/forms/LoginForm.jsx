import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUsuarioService } from '../../services/auth.service';

export const LoginForm = () => {
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorBackend, setErrorBackend] = useState('');
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setCargando(true);
    setErrorBackend('');
    setMensajeExito('');

    try {
      const respuesta = await loginUsuarioService(data);
      
      const token = respuesta.token || respuesta.data?.token;
      const usuario = respuesta.usuario || respuesta.data?.usuario;

      if (usuario && usuario.rol !== 'admin') {
        setErrorBackend("No tenés permisos de administrador");
        
        localStorage.removeItem('token');
        localStorage.removeItem('rol');

        setCargando(false);

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);

        return;
      }

      if (token) {
        localStorage.setItem('token', token);
        if (usuario && usuario.rol) {
          localStorage.setItem('rol', usuario.rol);
        }
      }

      setMensajeExito('¡Inicio de sesión exitoso!');
      reset();

      setTimeout(() => {
        setMensajeExito('');
        window.location.href = '/admin';
      }, 1500);

    } catch (error) {
      setErrorBackend(error.message || "Error al iniciar sesión en el servidor");
      setCargando(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '480px', 
      margin: '40px auto', 
      padding: '30px', 
      backgroundColor: 'var(--color-surface)', 
      border: '1px solid var(--color-border)', 
      borderRadius: 'var(--radius-md)', 
      boxShadow: 'var(--shadow-md)' 
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: 'var(--color-ink)', fontWeight: '700' }}>
        Iniciar Sesión
      </h2>
      
      {mensajeExito && (
        <div role="status" aria-live="polite" style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
          {mensajeExito}
        </div>
      )}

      {errorBackend && (
        <div role="alert" style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
          {errorBackend}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="correo" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Correo Electrónico:</label>
          <input
            id="correo"
            type="email"
            aria-invalid={errors.correo ? "true" : "false"}
            aria-describedby={errors.correo ? "correo-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo inválido"
              }
            })}
          />
          {errors.correo && (
            <p id="correo-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.correo.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Contraseña:</label>
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Debe tener al menos 6 caracteres" }
            })}
          />
          {errors.password && (
            <p id="password-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: 'var(--color-primary)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 'var(--radius-sm)', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '15px', 
            opacity: cargando ? 0.7 : 1,
            transition: 'background-color var(--transition)'
          }}
        >
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};