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
}
