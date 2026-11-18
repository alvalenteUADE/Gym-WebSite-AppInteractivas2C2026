import Chip from '@mui/material/Chip'

const COLORES = {
  Pendiente: 'warning',
  Leída: 'info',
  Respondida: 'success',
}

function ConsultaEstadoChip({ estado, ...props }) {
  return (
    <Chip
      label={estado}
      color={COLORES[estado] ?? 'default'}
      size="small"
      {...props}
    />
  )
}

export default ConsultaEstadoChip
