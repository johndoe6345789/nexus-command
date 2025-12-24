import { Typography, TypographyProps } from '@mui/material'
import { motion, HTMLMotionProps } from 'framer-motion'

interface TextProps extends TypographyProps {
  animated?: boolean
  gradient?: boolean
}

export function Text({ animated = false, gradient = false, children, sx, ...props }: TextProps) {
  const gradientStyle = gradient ? {
    background: 'linear-gradient(90deg, oklch(0.75 0.20 220), oklch(0.70 0.18 35))',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } : {}

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography sx={{ ...gradientStyle, ...sx }} {...props}>
          {children}
        </Typography>
      </motion.div>
    )
  }

  return (
    <Typography sx={{ ...gradientStyle, ...sx }} {...props}>
      {children}
    </Typography>
  )
}
