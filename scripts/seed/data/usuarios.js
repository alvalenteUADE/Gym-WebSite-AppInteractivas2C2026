// ============================================================
// USUARIOS ADMINISTRADORES
// ------------------------------------------------------------
// Para agregar un usuario de prueba, sumar un objeto al array.
// Campos requeridos por POST /api/user/register:
//   nombre, apellido, correo (único), telefono, password
//
// El PRIMER usuario de la lista es el que usa el seed para
// autenticarse y crear el resto de los datos.
// ============================================================

module.exports = [
    {
        nombre: 'Alejandro',
        apellido: 'Valente',
        correo: 'alejandro.valente@gymfitness.com',
        telefono: '1155551234',
        password: 'Admin1234'
    },
    {
        nombre: 'María',
        apellido: 'González',
        correo: 'maria.gonzalez@gymfitness.com',
        telefono: '1155555678',
        password: 'Admin1234'
    },
    {
        nombre: 'Lucas',
        apellido: 'Fernández',
        correo: 'lucas.fernandez@gymfitness.com',
        telefono: '1155559012',
        password: 'Admin1234'
    }
];
