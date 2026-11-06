import { useState } from 'react';
import { InstitutionForm } from '../../components/forms/InstitutionForm';

export const AdminInstitucion = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [institucionAEditar, setInstitucionAEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  const mostrarAlertaTemporal = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  const guardarInstitucion = (nuevaInst) => {
    setInstituciones([...instituciones, nuevaInst]);
    setMostrarFormulario(false);
    setInstitucionAEditar(null);
    mostrarAlertaTemporal('¡Institución registrada con éxito!');
  };

  const actualizarInstitucion = (instActualizada) => {
    setInstituciones(instituciones.map(inst => inst.id === instActualizada.id ? instActualizada : inst));
    setInstitucionAEditar(null);
    setMostrarFormulario(false);
    mostrarAlertaTemporal('¡Institución modificada con éxito!');
  };

  const iniciarEdicion = (inst) => {
    setInstitucionAEditar(inst);
    setMostrarFormulario(true);
  };

  const abrirRegistroNuevo = () => {
    setInstitucionAEditar(null);
    setMostrarFormulario(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Administración de Instituciones</h1>
      
      {/* Cartel de éxito flotante */}
      {mensajeExito && (
        <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}>
          {mensajeExito}
        </div>
      )}

      {/* Si el formulario está activo, ocultamos el listado */}
      {mostrarFormulario ? (
        <div style={{ maxWidth: '480px', margin: '0 auto', marginBottom: '30px' }}>
          <InstitutionForm 
            institucionInicial={institucionAEditar}
            onInstitutionCreated={guardarInstitucion} 
            onUpdateInstitution={actualizarInstitucion}
          />
          <button 
            onClick={() => { setMostrarFormulario(false); setInstitucionAEditar(null); }}
            style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button 
              onClick={abrirRegistroNuevo}
              style={{ padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
            >
              + Registrar Nueva Institución
            </button>
          </div>

          <div>
            {/* El título con el contador solo se muestra si hay al menos una institución */}
            {instituciones.length > 0 && (
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Instituciones Registradas ({instituciones.length})
              </h2>
            )}

            {instituciones.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>Aún no se ha registrado ninguna institución.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', justifyContent: 'center' }}>
                {instituciones.map((inst) => (
                  <div key={inst.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#222' }}>{inst.nombre}</h3>
                    <p style={{ margin: '8px 0', color: '#555', fontSize: '14px' }}><strong>Descripción:</strong> {inst.descripcion}</p>
                    <p style={{ margin: '8px 0', color: '#555', fontSize: '14px' }}><strong>Dirección:</strong> {inst.direccion}</p>
                    <p style={{ margin: '8px 0', color: '#555', fontSize: '14px' }}><strong>Teléfono:</strong> {inst.telefono}</p>
                    <p style={{ margin: '8px 0', color: '#555', fontSize: '14px' }}><strong>Redes:</strong> {inst.redesSociales || 'No especificadas'}</p>
                    
                    <div style={{ margin: '8px 0', color: '#555', fontSize: '14px' }}>
                      <strong>Horarios:</strong>
                      {Array.isArray(inst.horariosAtencion) ? (
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                          {inst.horariosAtencion.map((bloque, index) => (
                            <li key={index}>{bloque}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ margin: '4px 0 0 0' }}>{inst.horariosAtencion}</p>
                      )}
                    </div>

                    <button 
                      onClick={() => iniciarEdicion(inst)}
                      style={{ marginTop: '15px', width: '100%', padding: '8px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Editar Institución
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};