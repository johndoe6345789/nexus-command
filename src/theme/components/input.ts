export const inputStyles = {
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          background: 'rgba(10, 11, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '8px',
          '& fieldset': {
            borderColor: 'rgba(91, 143, 199, 0.4)',
            transition: 'all 0.3s',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(91, 143, 199, 0.6)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#5B8FC7',
            boxShadow: '0 0 16px rgba(91, 143, 199, 0.25)',
          },
        },
      },
    },
  },
}
