import { Box, Typography, Stack } from '@mui/material'
import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: number
  color?: string
  label?: string
  variant?: 'ring' | 'dots' | 'pulse' | 'orbit' | 'bars'
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
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Box
                sx={{
                  width: size / 4.5,
                  height: size / 4.5,
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: `0 0 16px ${color}90, 0 0 8px ${color}60`
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
        <Box sx={{ position: 'relative', width: size, height: size }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `3px solid ${color}`,
              }}
              animate={{
                scale: [0.8, 1.8],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeOut'
              }}
            />
          ))}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 20px ${color}80`,
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

  if (variant === 'orbit') {
    return (
      <Stack alignItems="center" spacing={2}>
        <Box sx={{ position: 'relative', width: size, height: size }}>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: size / 5,
                  height: size / 5,
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: `0 0 12px ${color}80`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -size / 10,
                  marginTop: -size / 10,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
                initial={{
                  x: Math.cos((i * 120 * Math.PI) / 180) * (size * 0.35),
                  y: Math.sin((i * 120 * Math.PI) / 180) * (size * 0.35),
                }}
              />
            ))}
          </motion.div>
        </Box>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {label}
          </Typography>
        )}
      </Stack>
    )
  }

  if (variant === 'bars') {
    return (
      <Stack alignItems="center" spacing={2}>
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', height: size }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{
                width: size / 8,
                borderRadius: size / 16,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}60`,
              }}
              animate={{
                height: [size * 0.3, size * 0.8, size * 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut'
              }}
            />
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

  return (
    <Stack alignItems="center" spacing={2}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="31.4 94.2"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              transformOrigin: 'center',
              filter: `drop-shadow(0 0 6px ${color}60)`
            }}
          />
        </motion.svg>
      </Box>
      {label && (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {label}
        </Typography>
      )}
    </Stack>
  )
}
