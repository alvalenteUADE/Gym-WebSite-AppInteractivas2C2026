import MuiContainer from '@mui/material/Container'

const maxWidths = {
  default: 1500,
  narrow: 820,
  wide: 1320,
}

function Container({ children, size = 'default', className = '' }) {
  return (
    <MuiContainer
      className={className}
      maxWidth={false}
      disableGutters
      sx={{
        width: '100%',
        maxWidth: maxWidths[size] ?? maxWidths.default,
        marginInline: 'auto',
        paddingInline: { xs: '20px', sm: '32px', md: '100px' },
      }}
    >
      {children}
    </MuiContainer>
  )
}

export default Container
