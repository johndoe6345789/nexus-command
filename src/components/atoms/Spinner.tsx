import { Box, Typography, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import { Loader2, RefreshCw, Orbit, Disc3 } from 'lucide-react'

interface SpinnerProps {
  size?: number
  color?: string
  label?: string
  variant?: 'loader' | 'dots' | 'refresh' | 'orbit' | 'disc'
}

export function Spinner({ 
  size = 40, 
  color = 'oklch(0.65 0.25 230)',
  label,
  variant = 'loader'
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

  if (variant === 'refresh') {
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
          <RefreshCw size={size} strokeWidth={2.5} color={color} />
        </motion.div>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {label}
          </Typography>
        )}
      </Stack>
    )
  }

  if (variant === 'orbit') {
    return (
      <Stack alignItems="center" spacing={2}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Orbit size={size} strokeWidth={2.5} color={color} />
        </motion.div>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {label}
          </Typography>
        )}
      </Stack>
    )
  }

  if (variant === 'disc') {
    return (
      <Stack alignItems="center" spacing={2}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Disc3 size={size} strokeWidth={2.5} color={color} />
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
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Loader2 size={size} strokeWidth={2.5} color={color} />
      </motion.div>
      {label && (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {label}
        </Typography>
      )}
    </Stack>
  )
}
