// Definimos la URL base de la API apuntando al servidor backend (puerto 4000)
const API_URL = "http://localhost:4000/api/user";

export const registrarUsuarioService = async (datosRegistro) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosRegistro),
    });

    const data = await response.json();

    if (!response.ok) {
      // Extraemos exactamente el 'message' que manda el controlador del backend
      const mensajeError = data.message || "Error al registrar el usuario";
      throw new Error(mensajeError);
    }

    return data; // Devuelve { status, data: { usuario, token }, message }
  } catch (error) {
    throw error;
  }
};

export const loginUsuarioService = async (credenciales) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    });

    const data = await response.json();

    if (!response.ok) {
      const mensajeError = data.message || "Credenciales inválidas o error en el servidor";
      throw new Error(mensajeError);
    }

    return data; // Devuelve { status, data: { usuario, token }, message }
  } catch (error) {
    throw error;
  }
};