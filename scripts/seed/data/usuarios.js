// ============================================================
// USUARIOS DE PRUEBA
// ------------------------------------------------------------
// Para agregar un usuario de prueba, sumar un objeto al array.
// Campos: nombre, apellido, correo (único), telefono, password, rol
// Roles admitidos: 'admin' | 'cliente'
//
// El PRIMER usuario con rol 'admin' es el que usa el seed para
// firmar el token con el que carga el resto de los datos.
// ============================================================

module.exports = [
    {
        nombre: 'Alejandro',
        apellido: 'Valente',
        correo: 'alejandro.valente@gymfitness.com',
        telefono: '1155551234',
        password: 'Admin1234',
        rol: 'admin'
    },
    {
        nombre: 'Juan',
        apellido: 'Fortez',
        correo: 'juan.fortez@gymfitness.com',
        telefono: '1178493203',
        password: 'Admin1234',
        rol: 'admin'
    },
    {
        nombre: 'María',
        apellido: 'González',
        correo: 'maria.gonzalez@gymfitness.com',
        telefono: '1155555678',
        password: 'Admin1234',
        rol: 'admin'
    },
    {
        nombre: 'Lucas',
        apellido: 'Fernández',
        correo: 'lucas.fernandez@gymfitness.com',
        telefono: '1155559012',
        password: 'Cliente1234',
        rol: 'cliente'
    },
    {
        nombre: 'Martina',
        apellido: 'Ríos',
        correo: 'martina.rios@gmail.com',
        telefono: '1144785521',
        password: 'Cliente1234',
        rol: 'cliente'
    },
    {
        nombre: 'Gonzalo',
        apellido: 'Pérez',
        correo: 'gonzalo.perez@hotmail.com',
        telefono: '1133445566',
        password: 'Cliente1234',
        rol: 'cliente'
    },
    {
        nombre: 'Lucía',
        apellido: 'Benítez',
        correo: 'lucia.benitez@gmail.com',
        telefono: '1156320087',
        password: 'Cliente1234',
        rol: 'cliente'
    },
    {
        nombre: 'Diego',
        apellido: 'Castro',
        correo: 'diego.castro@outlook.com',
        telefono: '1133901244',
        password: 'Cliente1234',
        rol: 'cliente'
    },
    {
        nombre: 'Carolina',
        apellido: 'Suárez',
        correo: 'carolina.suarez@gmail.com',
        telefono: '1167119823',
        password: 'Cliente1234',
        rol: 'cliente'
    },
    {
        nombre: 'Federico',
        apellido: 'Álvarez',
        correo: 'federico.alvarez@gmail.com',
        telefono: '1167554390',
        password: 'Cliente1234',
        rol: 'cliente'
    }
];
