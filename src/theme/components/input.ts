export const inputStyles = {
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
}
