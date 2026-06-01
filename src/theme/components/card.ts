export const cardStyles = {
  MuiCard: {
    defaultProps: {
      elevation: 4,
    },
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(10, 14, 24, 0.78)',
        backgroundImage: 'none',
        border: '1px solid rgba(136, 179, 217, 0.14)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: '0 18px 48px rgba(0, 0, 0, 0.32)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          backgroundColor: 'rgba(12, 17, 28, 0.86)',
          borderColor: 'rgba(136, 179, 217, 0.24)',
        },
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 2,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
}
