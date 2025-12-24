import { Box, Typography, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import { Circle, CircleNotch, Spinner as SpinnerIcon } from '@phosphor-icons/react'

interface SpinnerProps {
  size?: number
  color?: string
  label?: string
  variant?: 'circle' | 'dots' | 'ring' | 'pulse'
}

export function Spinner({ 
  size = 40, 
  color = 'oklch(0.65 0.25 230)',
  label,
  variant = 'ring'
}: SpinnerProps) {
  
  if (variant === 'dots') {
    return (
      <Stack alignItems="center" spacing={2}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
            >
              <Box
                sx={{
                  width: size / 4,
                  height: size / 4,
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: `0 0 12px ${color}80`
                }}
              />
            </motion.div>
          ))}
        </Box>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {label}
          </Typography>
        )}
      </Stack>
    )
  }

  if (variant === 'pulse') {
    return (
      <Stack alignItems="center" spacing={2}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 24px ${color}80, inset 0 0 12px oklch(1 0 0 / 0.2)`
            }}
          >
            <Circle size={size * 0.5} weight="fill" color="oklch(1 0 0 / 0.9)" />
          </Box>
        </motion.div>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {label}
          </Typography>
        )}
      </Stack>
    )
  }

  if (variant === 'circle') {
    return (
      <Stack alignItems="center" spacing={2}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <CircleNotch size={size} weight="bold" color={color} />
        </motion.div>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {label}
          </Typography>
        )}
      </Stack>
    )
  }

  return (
    <Stack alignItems="center" spacing={2}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              border: `3px solid transparent`,
              borderTopColor: color,
              borderRightColor: color,
              borderRadius: '50%',
              boxShadow: `0 0 16px ${color}60`
            }}
          />
        </motion.div>
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: '70%',
            height: '70%',
            top: '15%',
            left: '15%'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              border: `2px solid transparent`,
              borderBottomColor: `${color}80`,
              borderLeftColor: `${color}80`,
              borderRadius: '50%'
            }}
          />
        </motion.div>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: '30%',
            backgroundColor: color,
            borderRadius: '50%',
            boxShadow: `0 0 12px ${color}`
          }}
        />
      </Box>
      {label && (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {label}
        </Typography>
      )}
    </Stack>
  )
}
