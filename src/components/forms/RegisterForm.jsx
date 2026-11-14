import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
  const [mensajeExito, setMensajeExito] = useState('');

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

  const onSubmit = (data) => {
    const datosParaBackend = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.email, 
      telefono: data.telefono,
      password: data.password
    };

    setMensajeExito('¡Registro exitoso! Cuenta creada correctamente.');
    reset();

    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#222' }}>Crear Cuenta</h2>
      
      {mensajeExito && (
        <div role="status" aria-live="polite" style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Nombre */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nombre:</label>
          <input
            id="nombre"
            type="text"
            aria-invalid={errors.nombre ? "true" : "false"}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
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
            <p id="nombre-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Campo Apellido */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="apellido" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Apellido:</label>
          <input
            id="apellido"
            type="text"
            aria-invalid={errors.apellido ? "true" : "false"}
            aria-describedby={errors.apellido ? "apellido-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
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
            <p id="apellido-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.apellido.message}
            </p>
          )}
        </div>

        {/* Campo Correo Electrónico */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo inválido"
              }
            })}
          />
          {errors.email && (
            <p id="email-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Teléfono */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Número de Teléfono:</label>
          <input
            id="telefono"
            type="tel"
            aria-invalid={errors.telefono ? "true" : "false"}
            aria-describedby={errors.telefono ? "telefono-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "El teléfono debe contener exactamente 10 dígitos"
              }
            })}
          />
          {errors.telefono && (
            <p id="telefono-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.telefono.message}
            </p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Contraseña:</label>
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Debe tener al menos 6 caracteres" }
            })}
            placeholder="••••••••"
          />
          {errors.password && (
            <p id="password-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Campo Confirmar Contraseña */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Confirmar Contraseña:</label>
          <input
            id="confirmPassword"
            type="password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("confirmPassword", {
              required: "Por favor confirma la contraseña",
              validate: value => value === passwordValue || "Las contraseñas no coinciden"
            })}
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};