import { Box, LinearProgress, Typography, Stack } from '@mui/material'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  label?: string
  showPercentage?: boolean
  color?: string
  height?: number
  animated?: boolean
}

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = true, 
  color = 'oklch(0.65 0.25 230)',
  height = 8,
  animated = true
}: ProgressBarProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {(label || showPercentage) && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          {label && (
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {label}
            </Typography>
          )}
          {showPercentage && (
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 700, 
                fontFamily: 'Orbitron, monospace',
                color: color
              }}
            >
              {Math.round(value)}%
            </Typography>
          )}
        </Stack>
      )}
      
      <Box
        sx={{
          width: '100%',
          height: height,
          backgroundColor: 'oklch(0.15 0.03 250)',
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid oklch(0.25 0.05 250)',
          position: 'relative',
          boxShadow: 'inset 0 2px 4px oklch(0 0 0 / 0.3)'
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: animated ? 0.5 : 0, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, oklch(0.75 0.25 250))`,
            position: 'relative',
            boxShadow: `0 0 12px ${color}80, inset 0 1px 0 oklch(1 0 0 / 0.2)`,
          }}
        >
          {animated && value > 0 && (
            <motion.div
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, oklch(1 0 0 / 0.4), transparent)',
                width: '50%'
              }}
            />
          )}
        </motion.div>
      </Box>
    </Box>
  )
}
