export const cardStyles = {
  MuiCard: {
    defaultProps: {
      elevation: 4,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
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
