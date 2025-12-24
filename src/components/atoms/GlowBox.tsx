import { Box, BoxProps } from '@mui/material'

interface GlowBoxProps extends BoxProps {
  glowColor?: string
  glowIntensity?: 'low' | 'medium' | 'high'
}

export function GlowBox({ 
  glowColor = 'oklch(0.75 0.20 220)', 
  glowIntensity = 'medium',
  sx,
  children,
  ...props 
}: GlowBoxProps) {
  const intensityMap = {
    low: { blur: '10px', opacity: 0.2 },
    medium: { blur: '20px', opacity: 0.3 },
    high: { blur: '30px', opacity: 0.5 },
  }

  const intensity = intensityMap[glowIntensity]

  return (
    <Box
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(circle, ${glowColor} / ${intensity.opacity}, transparent 70%)`,
          filter: `blur(${intensity.blur})`,
          pointerEvents: 'none',
          zIndex: -1,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
