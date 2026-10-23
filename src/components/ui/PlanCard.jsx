import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Button from './Button'
import '../../styles/ui/PlanCard.css'

function PlanCard({
  name,
  description,
  price,
  period,
  features = [],
  highlighted = false,
  badge,
  ctaLabel = 'Consultar',
  ctaHref = '#contacto',
  className = '',
}) {
  const classes = [
    'plan-card',
    highlighted && 'plan-card--featured',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Card className={classes} elevation={0}>
      {badge && (
        <Box component="span" className="plan-card__badge">
          {badge}
        </Box>
      )}

      <CardContent
        className="plan-card__content"
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          p: { xs: '26px', md: '34px' },
          '&:last-child': { pb: { xs: '26px', md: '34px' } },
        }}
      >
        <Box className="plan-card__header">
          <Typography component="h3" variant="h3" className="plan-card__name">
            {name}
          </Typography>

          {description && (
            <Typography variant="body2" className="plan-card__description">
              {description}
            </Typography>
          )}
        </Box>

        <Box className="plan-card__price-group">
          <Typography
            component="span"
            variant="h4"
            className="plan-card__price"
          >
            {price}
          </Typography>

          {period && (
            <Typography
              component="span"
              variant="caption"
              className="plan-card__period"
            >
              {period}
            </Typography>
          )}
        </Box>

        {features.length > 0 && (
          <List className="plan-card__features" disablePadding>
            {features.map((feature) => (
              <ListItem
                className="plan-card__feature"
                key={feature}
                disableGutters
                sx={{ alignItems: 'flex-start', gap: 1.25, px: 0, py: 0.7 }}
              >
                <ListItemIcon
                  className="plan-card__check"
                  aria-hidden="true"
                  sx={{ minWidth: 20, mt: '2px' }}
                >
                  ✓
                </ListItemIcon>

                <Typography component="span" variant="body2">
                  {feature}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}

        <Button
          className="plan-card__cta"
          href={ctaHref}
          variant={highlighted ? 'light' : 'secondary'}
          fullWidth
          aria-label={`${ctaLabel} - Plan ${name}`}
          sx={{ mt: 'auto' }}
        >
          {ctaLabel}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlanCard
