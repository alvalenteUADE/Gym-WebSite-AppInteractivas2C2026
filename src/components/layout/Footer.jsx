import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Container from './Container'
import '../../styles/layout/Footer.css'

function Footer({
  id,
  logo,
  brandName,
  description,
  columns = [],
  bottomNote,
}) {
  const year = new Date().getFullYear()

  return (
    <Box component="footer" id={id} className="footer">
      <Container>
        <Box className="footer__main">
          <Box className="footer__brand">
            {logo && (
              <Box
                component="img"
                src={logo}
                alt=""
                aria-hidden="true"
                className="footer__logo"
              />
            )}

            <Typography
              component="span"
              variant="subtitle1"
              className="footer__brand-name"
            >
              {brandName}
            </Typography>

            {description && (
              <Typography variant="body2" className="footer__description">
                {description}
              </Typography>
            )}
          </Box>

          {columns.map((column) => (
            <Box className="footer__column" key={column.title}>
              <Typography
                component="h2"
                variant="overline"
                className="footer__column-title"
              >
                {column.title}
              </Typography>

              <Box component="ul" className="footer__list">
                {column.items.map((item) => (
                  <Box component="li" key={item.label}>
                    {item.href ? (
                      <Link
                        className="footer__link"
                        href={item.href}
                        underline="none"
                        {...(item.external
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Typography
                        component="span"
                        variant="body2"
                        className="footer__text"
                      >
                        {item.label}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="footer__bottom">
          <Typography variant="caption" component="p">
            © {year} {brandName}. Todos los derechos reservados.
          </Typography>

          {bottomNote && (
            <Typography
              variant="caption"
              component="p"
              className="footer__note"
            >
              {bottomNote}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
