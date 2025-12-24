import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'oklch(0.75 0.20 220)',
      light: 'oklch(0.85 0.18 220)',
      dark: 'oklch(0.65 0.22 220)',
      contrastText: 'oklch(0.98 0.01 0)',
    },
    secondary: {
      main: 'oklch(0.70 0.18 35)',
      light: 'oklch(0.80 0.16 35)',
      dark: 'oklch(0.60 0.20 35)',
      contrastText: 'oklch(0.98 0.01 0)',
    },
    background: {
      default: 'oklch(0.08 0.01 250)',
      paper: 'oklch(0.12 0.02 250)',
    },
    text: {
      primary: 'oklch(0.98 0.01 0)',
      secondary: 'oklch(0.88 0.03 0)',
      disabled: 'oklch(0.55 0.05 250)',
    },
    error: {
      main: 'oklch(0.55 0.25 25)',
      contrastText: 'oklch(0.98 0.01 0)',
    },
    warning: {
      main: 'oklch(0.70 0.18 35)',
      contrastText: 'oklch(0.98 0.01 0)',
    },
    info: {
      main: 'oklch(0.75 0.20 220)',
      contrastText: 'oklch(0.98 0.01 0)',
    },
    success: {
      main: 'oklch(0.70 0.18 150)',
      contrastText: 'oklch(0.98 0.01 0)',
    },
    divider: 'oklch(0.25 0.05 250 / 0.3)',
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 900,
      fontSize: '6rem',
      letterSpacing: '-0.04em',
      textTransform: 'uppercase',
      lineHeight: 0.9,
    },
    h2: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 800,
      fontSize: '4rem',
      letterSpacing: '-0.03em',
      textTransform: 'uppercase',
      lineHeight: 1,
    },
    h3: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      lineHeight: 1.1,
    },
    h4: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: "'Rajdhani', system-ui, sans-serif",
      fontWeight: 700,
      fontSize: '1.125rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '16px 32px',
          fontSize: '1.125rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: '0 4px 16px oklch(0 0 0 / 0.3)',
          backdropFilter: 'blur(20px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, oklch(1 0 0 / 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px oklch(0 0 0 / 0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, oklch(0.75 0.20 220), oklch(0.65 0.22 240))',
          border: '1px solid oklch(0.75 0.20 220 / 0.5)',
          boxShadow: '0 4px 16px oklch(0.75 0.20 220 / 0.3), inset 0 0 20px oklch(0.75 0.20 220 / 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, oklch(0.85 0.18 220), oklch(0.75 0.20 240))',
            boxShadow: '0 8px 24px oklch(0.75 0.20 220 / 0.5), inset 0 0 20px oklch(0.75 0.20 220 / 0.2)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, oklch(0.70 0.18 35), oklch(0.60 0.20 25))',
          border: '1px solid oklch(0.70 0.18 35 / 0.5)',
          boxShadow: '0 4px 16px oklch(0.70 0.18 35 / 0.3), inset 0 0 20px oklch(0.70 0.18 35 / 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, oklch(0.80 0.16 35), oklch(0.70 0.18 25))',
            boxShadow: '0 8px 24px oklch(0.70 0.18 35 / 0.5), inset 0 0 20px oklch(0.70 0.18 35 / 0.2)',
          },
        },
        outlined: {
          background: 'oklch(0.12 0.02 250 / 0.4)',
          backdropFilter: 'blur(40px)',
          border: '1px solid oklch(0.25 0.05 250 / 0.5)',
          '&:hover': {
            background: 'oklch(0.15 0.02 250 / 0.6)',
            border: '1px solid oklch(0.75 0.20 220 / 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'oklch(0.12 0.02 250 / 0.4)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid oklch(0.25 0.05 250 / 0.3)',
          boxShadow: '0 8px 32px oklch(0 0 0 / 0.4)',
          borderRadius: '12px',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            border: '1px solid oklch(0.75 0.20 220 / 0.4)',
            boxShadow: '0 12px 48px oklch(0 0 0 / 0.5), 0 0 40px oklch(0.75 0.20 220 / 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'oklch(0.12 0.02 250 / 0.4)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid oklch(0.25 0.05 250 / 0.3)',
          boxShadow: '0 8px 32px oklch(0 0 0 / 0.4)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'oklch(0.10 0.02 250 / 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'oklch(0.25 0.05 250 / 0.5)',
              transition: 'all 0.3s',
            },
            '&:hover fieldset': {
              borderColor: 'oklch(0.75 0.20 220 / 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'oklch(0.75 0.20 220)',
              boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.3)',
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            background: 'linear-gradient(135deg, oklch(0.75 0.20 220), oklch(0.65 0.22 240))',
            boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.5)',
            border: '2px solid oklch(0.98 0.01 0)',
            '&:hover': {
              boxShadow: '0 0 30px oklch(0.75 0.20 220 / 0.7)',
            },
          },
          '& .MuiSlider-track': {
            background: 'linear-gradient(90deg, oklch(0.75 0.20 220), oklch(0.70 0.18 35))',
            border: 'none',
            boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.3)',
          },
          '& .MuiSlider-rail': {
            background: 'oklch(0.15 0.02 250)',
            opacity: 1,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-track': {
            background: 'oklch(0.15 0.02 250)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-track': {
            background: 'linear-gradient(90deg, oklch(0.75 0.20 220), oklch(0.65 0.22 240))',
            opacity: 1,
            boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.4)',
          },
          '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 8px oklch(0 0 0 / 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'oklch(0.15 0.02 250 / 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid oklch(0.25 0.05 250 / 0.5)',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 600,
        },
        filled: {
          background: 'oklch(0.75 0.20 220 / 0.2)',
          border: '1px solid oklch(0.75 0.20 220 / 0.5)',
          color: 'oklch(0.85 0.18 220)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'oklch(0.12 0.02 250 / 0.6)',
          backdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: '0 4px 24px oklch(0 0 0 / 0.3)',
          borderBottom: '1px solid oklch(0.25 0.05 250 / 0.3)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'oklch(0.10 0.02 250 / 0.95)',
          backdropFilter: 'blur(60px) saturate(180%)',
          border: '1px solid oklch(0.75 0.20 220 / 0.3)',
          boxShadow: '0 24px 80px oklch(0 0 0 / 0.6), 0 0 80px oklch(0.75 0.20 220 / 0.2)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: 'oklch(0.15 0.02 250)',
          borderRadius: '8px',
          height: '8px',
        },
        bar: {
          background: 'linear-gradient(90deg, oklch(0.75 0.20 220), oklch(0.70 0.18 35))',
          borderRadius: '8px',
          boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.5)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'oklch(0.10 0.02 250 / 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid oklch(0.75 0.20 220 / 0.3)',
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '12px 16px',
          boxShadow: '0 8px 24px oklch(0 0 0 / 0.4)',
        },
      },
    },
  },
})
