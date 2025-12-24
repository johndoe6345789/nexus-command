export const buttonStyles = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        padding: '16px 32px',
        fontSize: '1.125rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
        position: 'relative' as const,
        overflow: 'hidden' as const,
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        '&::before': {
          content: '""',
          position: 'absolute' as const,
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
        background: 'linear-gradient(135deg, #4A7DAF, #345A82)',
        border: '1px solid rgba(91, 143, 199, 0.25)',
        boxShadow: '0 4px 16px rgba(91, 143, 199, 0.08), inset 0 0 20px rgba(91, 143, 199, 0.02)',
        '&:hover': {
          background: 'linear-gradient(135deg, #5B8FC7, #3D6B9E)',
          boxShadow: '0 6px 20px rgba(91, 143, 199, 0.12), inset 0 0 20px rgba(91, 143, 199, 0.03)',
        },
      },
      containedSecondary: {
        background: 'linear-gradient(135deg, #C99758, #A77D45)',
        border: '1px solid rgba(201, 151, 88, 0.3)',
        boxShadow: '0 4px 16px rgba(201, 151, 88, 0.15), inset 0 0 20px rgba(201, 151, 88, 0.04)',
        '&:hover': {
          background: 'linear-gradient(135deg, #D9A768, #B78D55)',
          boxShadow: '0 6px 20px rgba(201, 151, 88, 0.2), inset 0 0 20px rgba(201, 151, 88, 0.06)',
        },
      },
      outlined: {
        background: 'rgba(18, 20, 31, 0.3)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(91, 143, 199, 0.3)',
        '&:hover': {
          background: 'rgba(91, 143, 199, 0.08)',
          border: '1px solid rgba(91, 143, 199, 0.4)',
        },
      },
    },
  },
}
