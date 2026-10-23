import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#174d37',
      dark: '#0f3a29',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#b9e8c9',
      dark: '#7fcea0',
      contrastText: '#0e1b14',
    },
    background: {
      default: '#f7f8f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#14201a',
      secondary: '#55615b',
    },
    divider: '#dfe4da',
  },
  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: 'clamp(2.7rem, 5.6vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.02,
      letterSpacing: '-0.05em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: '-0.035em',
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.65,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f7f8f4',
          color: '#55615b',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          gap: 8,
          borderRadius: 999,
          fontSize: '0.95rem',
          paddingInline: 22,
          paddingBlock: 13,
        },
        sizeSmall: {
          fontSize: '0.875rem',
          paddingInline: 18,
          paddingBlock: 10,
        },
        sizeLarge: {
          fontSize: '1rem',
          paddingInline: 28,
          paddingBlock: 15,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'inherit',
      },
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(223, 228, 218, 0.75)',
          backgroundColor: 'rgba(247, 248, 244, 0.92)',
          backgroundImage: 'none',
          boxShadow: 'none',
          backdropFilter: 'blur(14px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #dfe4da',
          borderRadius: 24,
          backgroundImage: 'none',
          boxShadow:
            '0 1px 2px rgba(14, 27, 20, 0.06), 0 10px 30px rgba(14, 27, 20, 0.05)',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
})

export default theme
