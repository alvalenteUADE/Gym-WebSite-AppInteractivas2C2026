import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from './Container'
import '../../styles/layout/Section.css'

function Section({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
  className = '',
  children,
}) {
  const hasHeader = eyebrow || title || description

  const classes = [
    'section',
    tone !== 'default' && `section--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const headerClasses = [
    'section__header',
    align === 'center' && 'section__header--center',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Box component="section" id={id} className={classes}>
      <Container>
        {hasHeader && (
          <Box component="header" className={headerClasses}>
            {eyebrow && (
              <Typography
                component="span"
                variant="overline"
                className="section__eyebrow"
              >
                {eyebrow}
              </Typography>
            )}

            {title && (
              <Typography
                component="h2"
                variant="h2"
                className="section__title"
              >
                {title}
              </Typography>
            )}

            {description && (
              <Typography
                component="p"
                variant="body1"
                className="section__description"
              >
                {description}
              </Typography>
            )}
          </Box>
        )}

        {children}
      </Container>
    </Box>
  )
}

export default Section
