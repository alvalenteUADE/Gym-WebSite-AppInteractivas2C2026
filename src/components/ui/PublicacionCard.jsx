import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import '../../styles/ui/PublicacionCard.css'

const formatearPrecio = (precio) => {
  if (precio === undefined || precio === null) {
    return null
  }

  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
}

function PublicacionCard({ publicacion }) {
  const { nombre, descripcion, categoria, imagenes, precio, disponible, destacada } =
    publicacion

  const precioFormateado = formatearPrecio(precio)
  const portada = imagenes?.[0]

  return (
    <Card className="pub-card" elevation={0} component="article">
      <Box className="pub-card__media">
        {portada ? (
          <Box
            component="img"
            className="pub-card__image"
            src={portada}
            alt={nombre}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Box className="pub-card__placeholder" aria-hidden="true">
            <Box component="span">Fitness Gym</Box>
          </Box>
        )}

        {destacada && (
          <Chip
            className="pub-card__badge"
            label="Destacada"
            size="small"
            color="secondary"
          />
        )}

        {!disponible && (
          <Box className="pub-card__overlay">
            <Box component="span">Sin cupo disponible</Box>
          </Box>
        )}
      </Box>

      <CardContent className="pub-card__body">
        {categoria?.nombre && (
          <Typography component="span" className="pub-card__category">
            {categoria.nombre}
          </Typography>
        )}

        <Typography component="h3" variant="h3" className="pub-card__title">
          {nombre}
        </Typography>

        <Typography component="p" className="pub-card__description">
          {descripcion}
        </Typography>

        <Box className="pub-card__footer">
          {precioFormateado ? (
            <Typography component="span" className="pub-card__price">
              {precioFormateado}
            </Typography>
          ) : (
            <Typography component="span" className="pub-card__price-empty">
              Consultar precio
            </Typography>
          )}

          {imagenes?.length > 1 && (
            <Typography component="span" className="pub-card__images">
              {imagenes.length} fotos
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default PublicacionCard
