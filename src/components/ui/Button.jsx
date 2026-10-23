import MuiButton from '@mui/material/Button'

const variants = {
  primary: 'contained',
  secondary: 'outlined',
  light: 'contained',
  text: 'text',
}

const colors = {
  primary: 'primary',
  secondary: 'primary',
  light: 'secondary',
  text: 'primary',
}

const sizes = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
}

function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  className = '',
  sx,
  ...props
}) {
  const isLight = variant === 'light'

  return (
    <MuiButton
      className={className}
      component={href ? 'a' : 'button'}
      href={href}
      type={href ? undefined : type}
      variant={variants[variant] ?? 'contained'}
      color={colors[variant] ?? 'primary'}
      size={sizes[size] ?? 'medium'}
      fullWidth={fullWidth}
      sx={{
        ...(isLight && {
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button
