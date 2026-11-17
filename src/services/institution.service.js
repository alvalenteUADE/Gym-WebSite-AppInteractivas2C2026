// src/services/institution.service.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Obtener la información institucional
export const obtenerInstitucion = async () => {
    try {
        const response = await fetch(`${API_URL}/institution`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener la información institucional');
        }

        const json = await response.json();
        
        // Extraemos correctamente la institución desde el objeto de respuesta del backend ({ status, data, message })
        return json.data || json.institucion || (Array.isArray(json) ? json[0] : json);
    } catch (error) {
        console.error('Error en servicio obtenerInstitucion:', error);
        throw error;
    }
};

// Crear una nueva institución (requiere token de admin)
export const crearInstitucion = async (datosInstitucion) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/institution/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosInstitucion)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear la institución');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en servicio crearInstitucion:', error);
        throw error;
    }
};

// Actualizar la información institucional (requiere token de admin)
export const actualizarInstitucion = async (id, datosInstitucion) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/institution/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosInstitucion)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar la institución');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en servicio actualizarInstitucion:', error);
        throw error;
    }
};