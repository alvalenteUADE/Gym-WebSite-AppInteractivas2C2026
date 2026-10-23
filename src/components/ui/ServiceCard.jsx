import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from './Button'
import '../../styles/ui/ServiceCard.css'

function ServiceCard({
  image,
  imageAlt = '',
  tag,
  title,
  description,
  href,
  linkLabel = 'Ver planes',
}) {
  return (
    <Card className="service-card" elevation={0}>
      {image && (
        <CardMedia
          component="img"
          className="service-card__image"
          image={image}
          alt={imageAlt}
          loading="lazy"
        />
      )}

      <CardContent
        className="service-card__body"
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          p: { xs: '22px', md: '28px' },
          '&:last-child': { pb: { xs: '22px', md: '28px' } },
        }}
      >
        {tag && (
          <Typography
            component="span"
            variant="overline"
            className="service-card__tag"
          >
            {tag}
          </Typography>
        )}

        <Typography
          component="h3"
          variant="h3"
          className="service-card__title"
        >
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" className="service-card__description">
            {description}
          </Typography>
        )}

        {href && (
          <Button
            className="service-card__link"
            href={href}
            variant="text"
            size="sm"
            sx={{
              alignSelf: 'flex-start',
              mt: 'auto',
              px: 0,
              pt: 2.75,
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            {linkLabel}
            <span aria-hidden="true">→</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ServiceCard
