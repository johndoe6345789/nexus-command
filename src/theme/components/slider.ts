export const sliderStyles = {
  MuiSlider: {
    styleOverrides: {
      root: {
        height: 10,
        padding: '20px 0',
        '& .MuiSlider-thumb': {
          width: 28,
          height: 28,
          background: 'linear-gradient(135deg, #88B3D9, #5B8FC7)',
          boxShadow: '0 0 20px rgba(91, 143, 199, 0.5), 0 4px 12px rgba(0, 0, 0, 0.5)',
          border: '3px solid rgba(255, 255, 255, 0.9)',
          transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            width: 32,
            height: 32,
            boxShadow: '0 0 28px rgba(91, 143, 199, 0.7), 0 6px 16px rgba(0, 0, 0, 0.6)',
            border: '3px solid #FFFFFF',
          },
          '&.Mui-active': {
            width: 34,
            height: 34,
            boxShadow: '0 0 36px rgba(91, 143, 199, 0.8), 0 8px 20px rgba(0, 0, 0, 0.7)',
          },
        },
        '& .MuiSlider-track': {
          height: 10,
          background: 'linear-gradient(90deg, #5B8FC7, #C99758)',
          border: 'none',
          boxShadow: '0 0 20px rgba(91, 143, 199, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
          borderRadius: '5px',
        },
        '& .MuiSlider-rail': {
          height: 10,
          background: 'rgba(26, 28, 46, 0.8)',
          backdropFilter: 'blur(10px)',
          opacity: 1,
          borderRadius: '5px',
          border: '1px solid rgba(91, 143, 199, 0.2)',
        },
        '& .MuiSlider-valueLabel': {
          background: 'linear-gradient(135deg, #5B8FC7, #3D6B9E)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 16px rgba(91, 143, 199, 0.35)',
          fontFamily: "'Rajdhani', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: '0.9rem',
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        '& .MuiSwitch-track': {
          background: '#1A1C2E',
          opacity: 1,
        },
        '& .Mui-checked + .MuiSwitch-track': {
          background: 'linear-gradient(90deg, #5B8FC7, #3D6B9E)',
          opacity: 1,
          boxShadow: '0 0 16px rgba(91, 143, 199, 0.3)',
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        },
      },
    },
  },
}
