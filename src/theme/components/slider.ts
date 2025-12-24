export const sliderStyles = {
  MuiSlider: {
    styleOverrides: {
      root: {
        height: 10,
        padding: '20px 0',
        '& .MuiSlider-thumb': {
          width: 28,
          height: 28,
          background: 'linear-gradient(135deg, #7EC4FF, #4A9EFF)',
          boxShadow: '0 0 24px rgba(74, 158, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5)',
          border: '3px solid rgba(255, 255, 255, 0.9)',
          transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            width: 32,
            height: 32,
            boxShadow: '0 0 36px rgba(74, 158, 255, 1), 0 6px 16px rgba(0, 0, 0, 0.6)',
            border: '3px solid #FFFFFF',
          },
          '&.Mui-active': {
            width: 34,
            height: 34,
            boxShadow: '0 0 48px rgba(74, 158, 255, 1), 0 8px 20px rgba(0, 0, 0, 0.7)',
          },
        },
        '& .MuiSlider-track': {
          height: 10,
          background: 'linear-gradient(90deg, #4A9EFF, #FFB74D)',
          border: 'none',
          boxShadow: '0 0 24px rgba(74, 158, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
          borderRadius: '5px',
        },
        '& .MuiSlider-rail': {
          height: 10,
          background: 'rgba(26, 28, 46, 0.8)',
          backdropFilter: 'blur(10px)',
          opacity: 1,
          borderRadius: '5px',
          border: '1px solid rgba(74, 158, 255, 0.2)',
        },
        '& .MuiSlider-valueLabel': {
          background: 'linear-gradient(135deg, #4A9EFF, #2678D9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 16px rgba(74, 158, 255, 0.5)',
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
          background: 'linear-gradient(90deg, #4A9EFF, #2678D9)',
          opacity: 1,
          boxShadow: '0 0 20px rgba(74, 158, 255, 0.4)',
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        },
      },
    },
  },
}
