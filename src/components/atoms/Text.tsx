import { Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'secondary' | 'text.secondary' | string
  animated?: boolean
  gradient?: boolean
  sx?: Record<string, any>
  children: ReactNode
}

export function Text({ 
  animated = false, 
  gradient = false, 
  children, 
  variant = 'body1',
  align = 'left',
  color,
  sx = {},
}: TextProps) {
  const gradientStyle = gradient ? {
    background: 'linear-gradient(90deg, #6495ff, #ff9664)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {}

  const combinedSx = {
    ...gradientStyle,
    ...sx,
  }

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant={variant} align={align} color={color} sx={combinedSx}>
          {children}
        </Typography>
      </motion.div>
    )
  }

  return (
    <Typography variant={variant} align={align} color={color} sx={combinedSx}>
      {children}
    </Typography>
  )
}
