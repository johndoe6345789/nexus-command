export const miscStyles = {
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
}
