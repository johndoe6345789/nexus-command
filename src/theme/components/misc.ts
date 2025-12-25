export const miscStyles = {
  MuiChip: {
    styleOverrides: {
      root: {
        background: 'linear-gradient(135deg, rgba(91, 143, 199, 0.15), rgba(61, 107, 158, 0.15))',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(91, 143, 199, 0.4)',
        fontFamily: "'Rajdhani', system-ui, sans-serif",
        fontWeight: 800,
        fontSize: '1rem',
        padding: '8px 4px',
        height: '40px',
        minWidth: '70px',
        boxShadow: '0 0 8px rgba(91, 143, 199, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
        color: '#FFFFFF',
        letterSpacing: '0.05em',
      },
      filled: {
        background: 'linear-gradient(135deg, rgba(91, 143, 199, 0.25), rgba(61, 107, 158, 0.25))',
        border: '2px solid rgba(91, 143, 199, 0.5)',
        color: '#FFFFFF',
        boxShadow: '0 0 12px rgba(91, 143, 199, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 700,
        fontSize: '0.7rem',
        minWidth: '20px',
        height: '20px',
        padding: '0 6px',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        background: 'rgba(18, 20, 31, 0.98)',
        backdropFilter: 'blur(40px) saturate(180%)',
        borderLeft: '1px solid rgba(91, 143, 199, 0.25)',
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: '48px',
      },
      indicator: {
        backgroundColor: '#5B8FC7',
        height: '3px',
        borderRadius: '3px 3px 0 0',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontFamily: "'Orbitron', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: '0.9rem',
        minHeight: '48px',
        color: 'rgba(224, 224, 224, 0.7)',
        '&.Mui-selected': {
          color: '#5B8FC7',
        },
        '&:hover': {
          color: '#88B3D9',
        },
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: 'rgba(18, 20, 31, 0.6)',
        backdropFilter: 'blur(40px) saturate(180%)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(91, 143, 199, 0.25)',
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        background: 'rgba(10, 11, 20, 0.95)',
        backdropFilter: 'blur(60px) saturate(180%)',
        border: '1px solid rgba(91, 143, 199, 0.25)',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(91, 143, 199, 0.08)',
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
        background: 'linear-gradient(90deg, #5B8FC7, #C99758)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(91, 143, 199, 0.2)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        background: 'rgba(10, 11, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(91, 143, 199, 0.25)',
        fontSize: '0.875rem',
        fontWeight: 600,
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
}
