// ============================================================
// CONFIGURACIÓN DEL PIE DE PÁGINA
// ------------------------------------------------------------
// El pie es el mismo en el sitio público y en el panel de
// administración, así que su contenido vive acá y lo consumen
// las dos partes en lugar de repetirlo.
//
// Los enlaces de "Explorar" usan ruta absoluta con ancla (/#inicio)
// para que funcionen desde cualquier pantalla: estando en el home
// es un scroll dentro de la misma página, y desde /admin llevan al
// sitio público y bajan a la sección.
//
// Al conectar el backend, estos datos salen de
// GET /api/institution (dirección, teléfono, horarios y redes).
// ============================================================

export const FOOTER_COLUMNS = [
  {
    title: 'Explorar',
    items: [
      { label: 'Inicio', href: '/#inicio' },
      { label: 'Actividades', href: '/#actividades' },
      { label: 'Planes', href: '/#planes' },
    ],
  },
  {
    title: 'Contacto',
    items: [
      { label: 'Av. Corrientes 1234, CABA' },
      { label: '011-4555-1234', href: 'tel:+541145551234' },
      { label: 'Lun a Vie 7–23 h · Sáb 9–20 h' },
    ],
  },
  {
    title: 'Seguinos',
    items: [
      {
        label: 'Instagram @fitnessgym',
        href: 'https://www.instagram.com/fitnessgym',
        external: true,
      },
      {
        label: 'Facebook /fitnessgym',
        href: 'https://www.facebook.com/fitnessgym',
        external: true,
      },
    ],
  },
]

export const FOOTER_BRAND = {
  brandName: 'Fitness Gym',
  description:
    'Un espacio para entrenar, progresar y sentirte mejor. Equipamiento, clases y acompañamiento profesional.',
  bottomNote: 'Fitness Gym · Av. Corrientes 1234, CABA',
}
