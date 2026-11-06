import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

export const InstitutionForm = ({ institucionInicial, onInstitutionCreated, onUpdateInstitution }) => {
  const [horariosList, setHorariosList] = useState([]);
  const [diaInicio, setDiaInicio] = useState('Lunes');
  const [diaFin, setDiaFin] = useState('Viernes');
  const [horaApertura, setHoraApertura] = useState('09:00');
  const [horaCierre, setHoraCierre] = useState('22:00');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    if (institucionInicial) {
      setValue('nombre', institucionInicial.nombre);
      setValue('descripcion', institucionInicial.descripcion);
      setValue('direccion', institucionInicial.direccion);
      setValue('telefono', institucionInicial.telefono);
      setValue('redesSociales', institucionInicial.redesSociales);
      setHorariosList(Array.isArray(institucionInicial.horariosAtencion) ? institucionInicial.horariosAtencion : [institucionInicial.horariosAtencion]);
    } else {
      reset();
      setHorariosList([]);
    }
  }, [institucionInicial, setValue, reset]);

  const agregarHorario = () => {
    if (!diaInicio || !diaFin || !horaApertura || !horaCierre) return;
    const nuevoBloque = `De ${diaInicio} a ${diaFin}, de ${horaApertura} a ${horaCierre} hs`;
    setHorariosList([...horariosList, nuevoBloque]);
  };

  const eliminarHorario = (index) => {
    setHorariosList(horariosList.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    if (horariosList.length === 0) {
      alert("Debes agregar al menos un horario de atención.");
      return;
    }

    const institucionDatos = {
      id: institucionInicial ? institucionInicial.id : Date.now(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      direccion: data.direccion,
      telefono: data.telefono,
      redesSociales: data.redesSociales,
      horariosAtencion: horariosList
    };

    if (institucionInicial && onUpdateInstitution) {
      onUpdateInstitution(institucionDatos);
    } else if (onInstitutionCreated) {
      onInstitutionCreated(institucionDatos);
      reset();
      setHorariosList([]);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#222' }}>
        {institucionInicial ? 'Modificar Institución' : 'Registrar Institución'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nombre:</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("nombre", {
              required: "El nombre es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "No se permiten caracteres especiales"
              }
            })}
          />
          {errors.nombre && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.nombre.message}</p>}
        </div>

        {/* Descripción */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Descripción:</label>
          <textarea
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("descripcion", {
              required: "La descripción es obligatoria",
              pattern: {
                value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,]+$/,
                message: "No se permiten caracteres especiales"
              }
            })}
          />
          {errors.descripcion && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.descripcion.message}</p>}
        </div>

        {/* Dirección */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Dirección:</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("direccion", {
              required: "La dirección es obligatoria",
              pattern: {
                value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#\-/°]+$/,
                message: "Ingrese una dirección válida"
              }
            })}
          />
          {errors.direccion && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.direccion.message}</p>}
        </div>

        {/* Teléfono */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Teléfono (10 dígitos):</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Debe contener exactamente 10 números"
              }
            })}
          />
          {errors.telefono && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.telefono.message}</p>}
        </div>

        {/* Redes Sociales */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Redes Sociales (Instagram / Web):</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("redesSociales")}
          />
        </div>

        {/* Horarios Múltiples */}
        <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '12px', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Horarios de Atención:</label>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#555' }}>Desde:</label>
              <select value={diaInicio} onChange={(e) => setDiaInicio(e.target.value)} style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#555' }}>Hasta:</label>
              <select value={diaFin} onChange={(e) => setDiaFin(e.target.value)} style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#555' }}>Apertura:</label>
              <input type="time" value={horaApertura} onChange={(e) => setHoraApertura(e.target.value)} style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#555' }}>Cierre:</label>
              <input type="time" value={horaCierre} onChange={(e) => setHoraCierre(e.target.value)} style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }} />
            </div>
          </div>

          <button type="button" onClick={agregarHorario} style={{ width: '100%', padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px', fontWeight: 'bold' }}>
            + Agregar Rango Horario
          </button>

          {horariosList.length > 0 && (
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: '#333' }}>
              {horariosList.map((h, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span>{h}</span>
                  <button type="button" onClick={() => eliminarHorario(index)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>[Eliminar]</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
          {institucionInicial ? 'Actualizar Institución' : 'Guardar Institución'}
        </button>
      </form>
    </div>
  );
};