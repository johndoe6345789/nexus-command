import { Card as MuiCard, CardContent, CardProps } from '@mui/material'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps extends Omit<CardProps, 'children'> {
  children: ReactNode
  hoverable?: boolean
  animated?: boolean
  selected?: boolean
}

export function GlassCard({ 
  children, 
  hoverable = true, 
  animated = true,
  selected = false,
  sx,
  ...props 
}: GlassCardProps) {
  const cardSx = {
    border: selected ? '2px solid' : '1px solid',
    borderColor: selected ? 'primary.main' : 'divider',
    bgcolor: selected ? 'primary.main' : 'background.paper',
    backgroundImage: selected 
      ? 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.1), oklch(0.70 0.18 35 / 0.1))'
      : 'none',
    cursor: hoverable ? 'pointer' : 'default',
    ...sx,
  }

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hoverable ? { scale: 1.02 } : undefined}
      >
        <MuiCard sx={cardSx} {...props}>
          <CardContent>
            {children}
          </CardContent>
        </MuiCard>
      </motion.div>
    )
  }

  return (
    <MuiCard sx={cardSx} {...props}>
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  )
}
