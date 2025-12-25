export const buttonStyles = {
  MuiButton: {
    defaultProps: {
      disableElevation: false,
    },
    styleOverrides: {
      root: {
        borderRadius: '8px',
        padding: '12px 24px',
        transition: 'all 0.2s ease-in-out',
      },
      sizeLarge: {
        padding: '16px 32px',
      },
      sizeMedium: {
        padding: '12px 24px',
      },
      sizeSmall: {
        padding: '8px 16px',
      },
    },
  },
}
