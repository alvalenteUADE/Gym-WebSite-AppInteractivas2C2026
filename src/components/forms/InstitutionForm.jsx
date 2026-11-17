import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

export const InstitutionForm = ({ institucionInicial, onInstitutionCreated, onUpdateInstitution }) => {
  const [horariosList, setHorariosList] = useState([]);
  const [diaInicio, setDiaInicio] = useState('Lunes');
  const [diaFin, setDiaFin] = useState('Viernes');
  const [horaApertura, setHoraApertura] = useState('09:00');
  const [horaCierre, setHoraCierre] = useState('22:00');
  const [errorHorario, setErrorHorario] = useState('');

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
      setValue('redesSociales', institucionInicial.redes_sociales || institucionInicial.redesSociales);
      
      const horarios = institucionInicial.horarios_atencion || institucionInicial.horariosAtencion;
      setHorariosList(Array.isArray(horarios) ? horarios : [horarios]);
    } else {
      reset();
      setHorariosList([]);
    }
    setErrorHorario('');
  }, [institucionInicial, setValue, reset]);

  const agregarHorario = () => {
    if (!diaInicio || !diaFin || !horaApertura || !horaCierre) return;
    
    let nuevoBloque = '';
    if (diaInicio === diaFin) {
      nuevoBloque = `${diaInicio}, de ${horaApertura} a ${horaCierre} hs`;
    } else {
      nuevoBloque = `De ${diaInicio} a ${diaFin}, de ${horaApertura} a ${horaCierre} hs`;
    }

    setHorariosList([...horariosList, nuevoBloque]);
    setErrorHorario('');
  };

  const eliminarHorario = (index) => {
    setHorariosList(horariosList.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    if (horariosList.length === 0) {
      setErrorHorario("Debes agregar al menos un horario de atención.");
      return;
    }

    setErrorHorario('');

    const institucionDatos = {
      id: institucionInicial ? (institucionInicial._id || institucionInicial.id) : Date.now(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      direccion: data.direccion,
      telefono: data.telefono,
      redes_sociales: data.redesSociales,
      horarios_atencion: horariosList.join(' - ')
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
    <div>
      <h2 style={{ textAlign: 'left', marginBottom: '20px', color: '#222', fontSize: '20px', fontWeight: 'bold' }}>
        {institucionInicial ? 'Modificar Institución' : 'Registrar Institución'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nombre:</label>
          <input
            id="nombre"
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
          <label htmlFor="descripcion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Descripción:</label>
          <textarea
            id="descripcion"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("descripcion", {
              required: "La descripción es obligatoria"
            })}
          />
          {errors.descripcion && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.descripcion.message}</p>}
        </div>

        {/* Dirección */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="direccion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Dirección:</label>
          <input
            id="direccion"
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
          <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Teléfono:</label>
          <input
            id="telefono"
            type="text"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^\+?(?=(?:\D*\d){8,15}\D*$)[0-9\s\-()]+$/,
                message: "Ingrese un número de teléfono válido (entre 8 y 15 dígitos)"
              }
            })}
          />
          {errors.telefono && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.telefono.message}</p>}
        </div>

        {/* Redes Sociales */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="redesSociales" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Redes Sociales:</label>
          <input
            id="redesSociales"
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

          {errorHorario && <p style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>{errorHorario}</p>}
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
          {institucionInicial ? 'Guardar Cambios' : 'Guardar Institución'}
        </button>
      </form>
    </div>
  );
};