import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  const [mensajeExito, setMensajeExito] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = (data) => {
    setMensajeExito('¡Inicio de sesión exitoso!');
    reset();

    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#222' }}>Iniciar Sesión</h2>
      
      {/* Cartel de éxito flotante accesible */}
      {mensajeExito && (
        <div role="status" aria-live="polite" style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="correo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Correo Electrónico:</label>
          <input
            id="correo"
            type="email"
            aria-invalid={errors.correo ? "true" : "false"}
            aria-describedby={errors.correo ? "correo-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo inválido"
              }
            })}
          />
          {errors.correo && (
            <p id="correo-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.correo.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Contraseña:</label>
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres"
              }
            })}
          />
          {errors.password && (
            <p id="password-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};