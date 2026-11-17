import { useState, useEffect } from 'react';
import { InstitutionForm } from '../../components/forms/InstitutionForm';
import { obtenerInstitucion, crearInstitucion, actualizarInstitucion } from '../../services/institution.service';

export const AdminInstitucion = () => {
  const [institucion, setInstitucion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState('modificar');
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorBackend, setErrorBackend] = useState('');

  useEffect(() => {
    cargarDatosInstitucion();
  }, []);

  // Bloquea el scroll de la página principal cuando el modal está abierto
  useEffect(() => {
    if (mostrarFormulario) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mostrarFormulario]);

  const cargarDatosInstitucion = async () => {
    try {
      setCargando(true);
      setErrorBackend('');
      const data = await obtenerInstitucion();
      setInstitucion(data);
    } catch (err) {
      setErrorBackend('No se pudo cargar la información institucional del servidor.');
    } finally {
      setCargando(false);
    }
  };

  const mostrarAlertaTemporal = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  const handleCreateInstitution = async (nuevaInst) => {
    try {
      setErrorBackend('');
      const respuesta = await crearInstitucion(nuevaInst);
      setInstitucion(respuesta.data || respuesta);
      setMostrarFormulario(false);
      mostrarAlertaTemporal('¡Institución creada con éxito!');
      cargarDatosInstitucion();
    } catch (err) {
      setErrorBackend(err.message || 'Error al crear la institución.');
    }
  };

  const handleUpdateInstitution = async (instActualizada) => {
    try {
      setErrorBackend('');
      const idInstitucion = institucion._id || institucion.id;
      const respuesta = await actualizarInstitucion(idInstitucion, instActualizada);
      
      setInstitucion(respuesta.institucion || respuesta.data || respuesta);
      setMostrarFormulario(false);
      mostrarAlertaTemporal('¡Información institucional modificada con éxito!');
      cargarDatosInstitucion(); // <--- Recargamos los datos frescos de la BD
    } catch (err) {
      setErrorBackend(err.message || 'Error al actualizar la institución.');
    }
  };

  if (cargando) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '16px' }}>Cargando información institucional...</div>;
  }

  return (
    <div style={{ padding: '30px 40px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      
      {/* Cabecera limpia sin el botón de Nueva institución */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', margin: '0 0 8px 0' }}>Institución</h1>
        <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>
          Información general del gimnasio, datos de contacto, horarios y redes sociales visibles en el sitio.
        </p>
      </div>

      {/* Alertas de éxito o error */}
      {mensajeExito && (
        <div role="status" aria-live="polite" style={{ padding: '12px 16px', marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '8px', fontWeight: 'bold' }}>
          {mensajeExito}
        </div>
      )}

      {errorBackend && (
        <div role="alert" style={{ padding: '12px 16px', marginBottom: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '8px', fontWeight: 'bold' }}>
          {errorBackend}
        </div>
      )}

      {/* Tarjeta de visualización principal */}
      {!institucion ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>No se encontró información institucional cargada en el sistema.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', color: '#222' }}>{institucion.nombre}</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ backgroundColor: '#e2f0cb', color: '#386641', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                Institución Activa
              </span>
              
              {/* Botón Modificar: Permite actualizar los datos de la institución activa */}
              <button
                onClick={() => {
                  setModoFormulario('modificar');
                  setMostrarFormulario(true);
                }}
                style={{
                  backgroundColor: '#f8f9fa',
                  color: '#28a745',
                  border: '1px solid #28a745',
                  borderRadius: '20px',
                  padding: '6px 18px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Modificar
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#888', fontWeight: 'bold' }}>DESCRIPCIÓN</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>{institucion.descripcion}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#888', fontWeight: 'bold' }}>DIRECCIÓN</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>{institucion.direccion}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#888', fontWeight: 'bold' }}>TELÉFONO</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>{institucion.telefono}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#888', fontWeight: 'bold' }}>REDES SOCIALES</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#333' }}>
                {institucion.redes_sociales || institucion.redesSociales || 'No especificadas'}
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#888', fontWeight: 'bold' }}>HORARIOS DE ATENCIÓN</p>
            {(() => {
              const horarios = institucion.horarios_atencion || institucion.horariosAtencion;
              return Array.isArray(horarios) ? (
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#333', fontSize: '14px' }}>
                  {horarios.map((bloque, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>{bloque}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>{horarios || 'No especificados'}</p>
              );
            })()}
          </div>
        </div>
      )}

      {/* Ventana Modal Flotante */}
      {mostrarFormulario && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMostrarFormulario(false);
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '40px 20px'
          }}
        >
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '85vh',
            overflowY: 'auto',
            marginTop: '30px'
          }}>
            <InstitutionForm 
              institucionInicial={modoFormulario === 'modificar' ? institucion : null}
              onInstitutionCreated={handleCreateInstitution}
              onUpdateInstitution={handleUpdateInstitution}
            />
            
            <button 
              type="button"
              onClick={() => setMostrarFormulario(false)}
              style={{ 
                marginTop: '15px', 
                width: '100%', 
                padding: '10px', 
                backgroundColor: '#6c757d', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold' 
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInstitucion;