import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4A9EFF',
      light: '#7EC4FF',
      dark: '#2678D9',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#FFB74D',
      light: '#FFE082',
      dark: '#FF9800',
      contrastText: '#FAFAFA',
    },
    background: {
      default: '#0A0B14',
      paper: '#12141F',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#E0E0E0',
      disabled: '#666B7D',
    },
    error: {
      main: '#D32F2F',
      contrastText: '#FAFAFA',
    },
    warning: {
      main: '#FFB74D',
      contrastText: '#FAFAFA',
    },
    info: {
      main: '#4A9EFF',
      contrastText: '#FAFAFA',
    },
    success: {
      main: '#4CAF50',
      contrastText: '#FAFAFA',
    },
    divider: 'rgba(74, 158, 255, 0.3)',
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
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4A9EFF, #2678D9)',
          border: '1px solid rgba(74, 158, 255, 0.5)',
          boxShadow: '0 4px 16px rgba(74, 158, 255, 0.3), inset 0 0 20px rgba(74, 158, 255, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7EC4FF, #4A9EFF)',
            boxShadow: '0 8px 24px rgba(74, 158, 255, 0.5), inset 0 0 20px rgba(74, 158, 255, 0.2)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FFB74D, #FF9800)',
          border: '1px solid rgba(255, 183, 77, 0.5)',
          boxShadow: '0 4px 16px rgba(255, 183, 77, 0.3), inset 0 0 20px rgba(255, 183, 77, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFE082, #FFB74D)',
            boxShadow: '0 8px 24px rgba(255, 183, 77, 0.5), inset 0 0 20px rgba(255, 183, 77, 0.2)',
          },
        },
        outlined: {
          background: 'rgba(18, 20, 31, 0.4)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(74, 158, 255, 0.5)',
          '&:hover': {
            background: 'rgba(18, 20, 31, 0.6)',
            border: '1px solid rgba(74, 158, 255, 0.7)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(18, 20, 31, 0.4)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(74, 158, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          borderRadius: '12px',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            border: '1px solid rgba(74, 158, 255, 0.4)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(74, 158, 255, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(18, 20, 31, 0.4)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(74, 158, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(10, 11, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'rgba(74, 158, 255, 0.5)',
              transition: 'all 0.3s',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(74, 158, 255, 0.7)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4A9EFF',
              boxShadow: '0 0 20px rgba(74, 158, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 10,
          padding: '20px 0',
          '& .MuiSlider-thumb': {
            width: 28,
            height: 28,
            background: 'linear-gradient(135deg, #7EC4FF, #4A9EFF)',
            boxShadow: '0 0 24px rgba(74, 158, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
            '&:hover': {
              width: 32,
              height: 32,
              boxShadow: '0 0 36px rgba(74, 158, 255, 1), 0 6px 16px rgba(0, 0, 0, 0.6)',
              border: '3px solid #FFFFFF',
            },
            '&.Mui-active': {
              width: 34,
              height: 34,
              boxShadow: '0 0 48px rgba(74, 158, 255, 1), 0 8px 20px rgba(0, 0, 0, 0.7)',
            },
          },
          '& .MuiSlider-track': {
            height: 10,
            background: 'linear-gradient(90deg, #4A9EFF, #FFB74D)',
            border: 'none',
            boxShadow: '0 0 24px rgba(74, 158, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
            borderRadius: '5px',
          },
          '& .MuiSlider-rail': {
            height: 10,
            background: 'rgba(26, 28, 46, 0.8)',
            backdropFilter: 'blur(10px)',
            opacity: 1,
            borderRadius: '5px',
            border: '1px solid rgba(74, 158, 255, 0.2)',
          },
          '& .MuiSlider-valueLabel': {
            background: 'linear-gradient(135deg, #4A9EFF, #2678D9)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 16px rgba(74, 158, 255, 0.5)',
            fontFamily: "'Rajdhani', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-track': {
            background: '#1A1C2E',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-track': {
            background: 'linear-gradient(90deg, #4A9EFF, #2678D9)',
            opacity: 1,
            boxShadow: '0 0 20px rgba(74, 158, 255, 0.4)',
          },
          '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.25), rgba(38, 120, 217, 0.25))',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(74, 158, 255, 0.6)',
          fontFamily: "'Rajdhani', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: '1rem',
          padding: '8px 4px',
          height: '40px',
          minWidth: '70px',
          boxShadow: '0 0 16px rgba(74, 158, 255, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          letterSpacing: '0.05em',
        },
        filled: {
          background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.35), rgba(38, 120, 217, 0.35))',
          border: '2px solid rgba(74, 158, 255, 0.7)',
          color: '#FFFFFF',
          boxShadow: '0 0 20px rgba(74, 158, 255, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(18, 20, 31, 0.6)',
          backdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid rgba(74, 158, 255, 0.3)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(10, 11, 20, 0.95)',
          backdropFilter: 'blur(60px) saturate(180%)',
          border: '1px solid rgba(74, 158, 255, 0.3)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 80px rgba(74, 158, 255, 0.2)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: '#1A1C2E',
          borderRadius: '8px',
          height: '8px',
        },
        bar: {
          background: 'linear-gradient(90deg, #4A9EFF, #FFB74D)',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(74, 158, 255, 0.5)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(10, 11, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(74, 158, 255, 0.3)',
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '12px 16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        },
      },
    },
  },
})
