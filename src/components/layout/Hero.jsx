import Button from '../ui/Button'
import Container from './Container'
import '../../styles/layout/Hero.css'

function Hero({
  id = 'inicio',
  eyebrow,
  title,
  highlight,
  description,
  primaryAction,
  secondaryAction,
  image,
  imageAlt = '',
  badge,
  stats = [],
}) {
  return (
    <section id={id} className="hero">
      <Container className="hero__inner">
        <div className="hero__content">
          {eyebrow && <span className="hero__eyebrow">{eyebrow}</span>}

          <h1 className="hero__title">
            {title}
            {highlight && (
              <span className="hero__title-highlight">{highlight}</span>
            )}
          </h1>

          {description && <p className="hero__description">{description}</p>}

          {(primaryAction || secondaryAction) && (
            <div className="hero__actions">
              {primaryAction && (
                <Button
                  className="hero__action"
                  href={primaryAction.href}
                  size="lg"
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  className="hero__action"
                  href={secondaryAction.href}
                  variant="secondary"
                  size="lg"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}

          {stats.length > 0 && (
            <ul className="hero__stats">
              {stats.map((stat) => (
                <li className="hero__stat" key={stat.label}>
                  <strong className="hero__stat-value">{stat.value}</strong>
                  <span className="hero__stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {image && (
          <div className="hero__media">
            <img className="hero__image" src={image} alt={imageAlt} />

            {badge && (
              <div className="hero__badge">
                {badge.label && (
                  <span className="hero__badge-label">{badge.label}</span>
                )}
                {badge.value && (
                  <strong className="hero__badge-value">{badge.value}</strong>
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

export default Hero
