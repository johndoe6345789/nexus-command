export const cardStyles = {
  MuiCard: {
    styleOverrides: {
      root: {
        background: 'rgba(18, 20, 31, 0.4)',
        backdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(91, 143, 199, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        borderRadius: '12px',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        '&:hover': {
          border: '1px solid rgba(91, 143, 199, 0.35)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(91, 143, 199, 0.12)',
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
        border: '1px solid rgba(91, 143, 199, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
}
