// ============================================================
// PUBLICACIONES (productos y servicios)
// ------------------------------------------------------------
// Para agregar una publicación, sumar un objeto al array.
// Campos de POST /api/publicacion/create:
//   nombre        (requerido)
//   descripcion   (requerido)
//   categoria     (requerido) -> NOMBRE de una categoría de data/categorias.js
//                              (el seed lo traduce al ID de Mongo)
//   imagenes      (opcional)  -> array de URLs o data URIs en base64
//   precio        (opcional)  -> número >= 0; omitir si no corresponde
//   disponible    (opcional)  -> true/false, default true
//   destacada     (opcional)  -> true/false, default false
// ============================================================

module.exports = [
    // ---------------------- Musculación ----------------------
    {
        nombre: 'Abono mensual sala de musculación',
        descripcion: 'Acceso ilimitado a la sala de musculación de lunes a domingo. Incluye rutina inicial armada por un instructor.',
        categoria: 'Musculación',
        imagenes: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48'],
        precio: 25000,
        disponible: true,
        destacada: true
    },
    {
        nombre: 'Abono trimestral sala de musculación',
        descripcion: 'Tres meses de acceso ilimitado a la sala de musculación con un 15% de descuento respecto al abono mensual.',
        categoria: 'Musculación',
        imagenes: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438'],
        precio: 63750,
        disponible: true
    },
    {
        nombre: 'Pase diario',
        descripcion: 'Acceso por un día a todas las instalaciones del gimnasio. Ideal para probar antes de asociarte.',
        categoria: 'Musculación',
        imagenes: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f'],
        precio: 3500,
        disponible: true
    },
    {
        nombre: 'Rutina personalizada de fuerza',
        descripcion: 'Planificación de 8 semanas orientada a ganancia de fuerza, con seguimiento quincenal de cargas.',
        categoria: 'Musculación',
        imagenes: ['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e'],
        precio: 12000,
        disponible: true
    },

    // ------------------------- Cardio ------------------------
    {
        nombre: 'Clase de Spinning',
        descripcion: 'Clase grupal de 45 minutos de alta intensidad sobre bicicleta fija. Cupo máximo de 20 personas.',
        categoria: 'Cardio',
        imagenes: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'],
        precio: 4500,
        disponible: true,
        destacada: true
    },
    {
        nombre: 'Sector cardio: cintas y elípticos',
        descripcion: 'Uso libre del sector cardio con 12 cintas de correr, 8 elípticos y 6 bicicletas. Incluido en todos los abonos.',
        categoria: 'Cardio',
        imagenes: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f'],
        disponible: true
    },
    {
        nombre: 'Running Team',
        descripcion: 'Entrenamientos de running al aire libre dos veces por semana con entrenador. Preparación para carreras de 5K y 10K.',
        categoria: 'Cardio',
        imagenes: ['https://images.unsplash.com/photo-1476480862126-209bfaa8edc8'],
        precio: 15000,
        disponible: true
    },
    {
        nombre: 'HIIT 30',
        descripcion: 'Entrenamiento interválico de alta intensidad de 30 minutos. Máxima quema de calorías en poco tiempo.',
        categoria: 'Cardio',
        imagenes: ['https://images.unsplash.com/photo-1599058917212-d750089bc07e'],
        precio: 4000,
        disponible: false
    },

    // -------------------- Clases grupales --------------------
    {
        nombre: 'Funcional',
        descripcion: 'Circuitos de entrenamiento funcional con peso corporal, kettlebells y TRX. Todos los niveles.',
        categoria: 'Clases grupales',
        imagenes: ['https://images.unsplash.com/photo-1518611012118-696072aa579a'],
        precio: 4200,
        disponible: true,
        destacada: true
    },
    {
        nombre: 'Yoga',
        descripcion: 'Clase de Hatha Yoga de 60 minutos enfocada en flexibilidad, respiración y relajación.',
        categoria: 'Clases grupales',
        imagenes: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'],
        precio: 4000,
        disponible: true
    },
    {
        nombre: 'Pilates Mat',
        descripcion: 'Trabajo de core, postura y control corporal sobre colchoneta. Grupos reducidos de hasta 12 personas.',
        categoria: 'Clases grupales',
        imagenes: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2'],
        precio: 4500,
        disponible: true
    },
    {
        nombre: 'Zumba',
        descripcion: 'Clase de baile fitness con ritmos latinos. Diversión garantizada mientras quemás calorías.',
        categoria: 'Clases grupales',
        imagenes: ['https://images.unsplash.com/photo-1524594152303-9fd13543fe6e'],
        precio: 3800,
        disponible: true
    },
    {
        nombre: 'Boxeo recreativo',
        descripcion: 'Técnica de boxeo, bolsa y sombra. Sin contacto. Excelente para descargar tensiones y mejorar la coordinación.',
        categoria: 'Clases grupales',
        imagenes: ['https://images.unsplash.com/photo-1549719386-74dfcbf7dbed'],
        precio: 5000,
        disponible: true
    },
    {
        nombre: 'CrossTraining',
        descripcion: 'Entrenamiento de alta intensidad que combina levantamiento olímpico, gimnasia y cardio. Requiere experiencia previa.',
        categoria: 'Clases grupales',
        imagenes: ['https://images.unsplash.com/photo-1526506118085-60ce8714f8c5'],
        precio: 5500,
        disponible: false
    },

    // ----------------- Entrenamiento personal ----------------
    {
        nombre: 'Personal Training - 1 sesión',
        descripcion: 'Sesión individual de 60 minutos con un entrenador personal certificado.',
        categoria: 'Entrenamiento personal',
        imagenes: ['https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb'],
        precio: 9000,
        disponible: true
    },
    {
        nombre: 'Personal Training - Pack 8 sesiones',
        descripcion: 'Ocho sesiones individuales de 60 minutos con seguimiento de objetivos. Vigencia de 2 meses.',
        categoria: 'Entrenamiento personal',
        imagenes: ['https://images.unsplash.com/photo-1434682881908-b43d0467b798'],
        precio: 64000,
        disponible: true,
        destacada: true
    },
    {
        nombre: 'Evaluación física inicial',
        descripcion: 'Evaluación gratuita de composición corporal, movilidad y condición física para nuevos socios.',
        categoria: 'Entrenamiento personal',
        imagenes: ['https://images.unsplash.com/photo-1576678927484-cc907957088c'],
        disponible: true
    },

    // ---------------- Nutrición y suplementos ----------------
    {
        nombre: 'Consulta nutricional',
        descripcion: 'Consulta de 45 minutos con nutricionista deportiva. Incluye plan alimentario según objetivo.',
        categoria: 'Nutrición y suplementos',
        imagenes: ['https://images.unsplash.com/photo-1490645935967-10de6ba17061'],
        precio: 11000,
        disponible: true
    },
    {
        nombre: 'Proteína Whey 1 kg',
        descripcion: 'Proteína de suero de leche sabor chocolate, 24 g de proteína por porción. 30 porciones.',
        categoria: 'Nutrición y suplementos',
        imagenes: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d'],
        precio: 32000,
        disponible: true
    },
    {
        nombre: 'Creatina monohidrato 300 g',
        descripcion: 'Creatina monohidrato micronizada, 60 porciones de 5 g. Sin sabor.',
        categoria: 'Nutrición y suplementos',
        imagenes: ['https://images.unsplash.com/photo-1579722821273-0f6c7d44362f'],
        precio: 18500,
        disponible: false
    }
];
