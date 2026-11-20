
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/user";

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

export const cerrarSesionService = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Error al cerrar la sesión");
    }
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
  }
};