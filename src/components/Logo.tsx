import { motion } from 'framer-motion'
import { Box } from '@mui/material'

interface LogoProps {
  size?: number
  showText?: boolean
  animate?: boolean
}

export function Logo({ size = 80, showText = true, animate = true }: LogoProps) {
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
    }
  }

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 0.2, 0.6],
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <motion.div
        variants={iconVariants}
        initial={animate ? "initial" : false}
        animate={animate ? "animate" : false}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', width: size, height: size }}
      >
        <motion.div
          variants={pulseVariants}
          initial={animate ? "initial" : false}
          animate={animate ? "animate" : false}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(0.75 0.20 220 / 0.3), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.75 0.20 220)" />
              <stop offset="50%" stopColor="oklch(0.70 0.18 35)" />
              <stop offset="100%" stopColor="oklch(0.75 0.20 220)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
          />

          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />

          <motion.path
            d="M 30 50 L 50 30 L 70 50 L 50 70 Z"
            fill="url(#logoGradient)"
            opacity="0.8"
            filter="url(#glow)"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={animate ? { pathLength: 1, opacity: 0.8 } : false}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />

          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="oklch(0.98 0.01 0)"
            filter="url(#glow)"
            initial={animate ? { scale: 0 } : false}
            animate={animate ? { scale: 1 } : false}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          />

          <motion.path
            d="M 50 15 L 50 25"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={animate ? { pathLength: 1, opacity: 1 } : false}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          />

          <motion.path
            d="M 50 75 L 50 85"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={animate ? { pathLength: 1, opacity: 1 } : false}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
          />

          <motion.path
            d="M 15 50 L 25 50"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={animate ? { pathLength: 1, opacity: 1 } : false}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
          />

          <motion.path
            d="M 75 50 L 85 50"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={animate ? { pathLength: 1, opacity: 1 } : false}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
          />
        </svg>
      </motion.div>

      {showText && (
        <motion.div
          initial={animate ? { opacity: 0, x: -20 } : false}
          animate={animate ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: 'var(--font-heading)',
              fontSize: size * 0.4,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, oklch(0.75 0.20 220), oklch(0.70 0.18 35), oklch(0.75 0.20 220))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            NEXUS
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: 'var(--font-heading)',
              fontSize: size * 0.22,
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            COMMAND
          </Box>
        </motion.div>
      )}
    </Box>
  )
}
