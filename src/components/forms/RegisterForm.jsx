import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registrarUsuarioService } from '../../services/auth.service';

export const RegisterForm = () => {
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorBackend, setErrorBackend] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    setCargando(true);
    setErrorBackend('');
    setMensajeExito('');

    const datosParaBackend = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.email, 
      telefono: data.telefono,
      password: data.password
    };

    try {
      const respuesta = await registrarUsuarioService(datosParaBackend);
      
      const token = respuesta.data?.token || respuesta.token;
      const usuario = respuesta.data?.usuario || respuesta.usuario;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (usuario && usuario.rol) {
        localStorage.setItem('rol', usuario.rol);
      }

      setMensajeExito('¡Registro exitoso! Redirigiendo al inicio...');
      reset();

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      setErrorBackend(error.message || "Hubo un error al registrarse en el servidor");
    } finally {
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
        Crear Cuenta
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
        {/* Campo Nombre */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Nombre:</label>
          <input
            id="nombre"
            type="text"
            aria-invalid={errors.nombre ? "true" : "false"}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "El nombre solo puede contener letras"
              }
            })}
          />
          {errors.nombre && (
            <p id="nombre-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Campo Apellido */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="apellido" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Apellido:</label>
          <input
            id="apellido"
            type="text"
            aria-invalid={errors.apellido ? "true" : "false"}
            aria-describedby={errors.apellido ? "apellido-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("apellido", {
              required: "El apellido es obligatorio",
              minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "El apellido solo puede contener letras"
              }
            })}
          />
          {errors.apellido && (
            <p id="apellido-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.apellido.message}
            </p>
          )}
        </div>

        {/* Campo Correo Electrónico */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo inválido"
              }
            })}
          />
          {errors.email && (
            <p id="email-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Teléfono */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="telefono" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Número de Teléfono:</label>
          <input
            id="telefono"
            type="tel"
            aria-invalid={errors.telefono ? "true" : "false"}
            aria-describedby={errors.telefono ? "telefono-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "El teléfono debe contener exactamente 10 dígitos"
              }
            })}
          />
          {errors.telefono && (
            <p id="telefono-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.telefono.message}
            </p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div style={{ marginBottom: '16px' }}>
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

        {/* Campo Confirmar Contraseña */}
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: 'var(--color-text)' }}>Confirmar Contraseña:</label>
          <input
            id="confirmPassword"
            type="password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            style={{ width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-ink)' }}
            {...register("confirmPassword", {
              required: "Por favor confirma la contraseña",
              validate: value => value === passwordValue || "Las contraseñas no coinciden"
            })}
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors.confirmPassword.message}
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
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};