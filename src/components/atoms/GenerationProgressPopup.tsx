import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, Stack, Typography, LinearProgress, Box, Chip } from '@mui/material'
import { Cube, Trophy, Lightning, Star, CheckCircle, Sparkle, Medal, Target } from '@phosphor-icons/react'
import { useState, useEffect, useRef } from 'react'

interface GenerationProgressPopupProps {
  isVisible: boolean
  progress: number
  label?: string
  type?: string
  seed?: string
}

export function GenerationProgressPopup({ 
  isVisible, 
  progress, 
  label = 'Generating...', 
  type,
  seed
}: GenerationProgressPopupProps) {
  const [showCelebration, setShowCelebration] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [particleData] = useState(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const isLeft = i % 2 === 0
      return {
        isLeft,
        startX: isLeft ? -100 : 100,
        endX: (Math.random() - 0.5) * 400,
        endY: -120 + Math.random() * 80,
        delay: Math.random() * 0.3,
        duration: 1.5 + Math.random() * 0.8,
        rotate: Math.random() * 720 - 360,
        iconType: i % 4,
        // Icon-specific random values
        starSize: 20 + Math.random() * 20,
        starColor: `oklch(${0.70 + Math.random() * 0.15} ${0.20 + Math.random() * 0.15} ${180 + Math.random() * 100})`,
        sparkleSize: 16 + Math.random() * 16,
        sparkleColor: `oklch(${0.70 + Math.random() * 0.15} ${0.20 + Math.random() * 0.15} ${40 + Math.random() * 60})`,
        trophySize: 18 + Math.random() * 14,
        trophyColor: `oklch(${0.75 + Math.random() * 0.1} ${0.25} ${45 + Math.random() * 20})`,
        medalSize: 18 + Math.random() * 14,
        medalColor: `oklch(${0.70 + Math.random() * 0.15} ${0.22} ${270 + Math.random() * 40})`,
      }
    })
  })

  const isComplete = progress >= 100 && isVisible

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (isComplete) {
      // Schedule state updates to avoid synchronous setState in effect
      timeoutRef.current = setTimeout(() => {
        setShowCelebration(true)
        timeoutRef.current = setTimeout(() => {
          setShowCelebration(false)
        }, 5000)
      }, 0)
    } else {
      timeoutRef.current = setTimeout(() => {
        setShowCelebration(false)
      }, 0)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 24,
            left: 0,
            right: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 24px',
          }}
        >
          {showCelebration && (
            <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', width: '100%', height: '200px', overflow: 'visible' }}>
              {particleData.map((particle, i) => {
                return (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      y: 80, 
                      x: particle.startX,
                      scale: 0,
                      rotate: 0
                    }}
                    animate={{ 
                      opacity: [0, 1, 1, 0], 
                      y: particle.endY,
                      x: particle.endX,
                      scale: [0, 1.2, 1, 0.3],
                      rotate: particle.rotate,
                    }}
                    transition={{ 
                      duration: particle.duration,
                      delay: particle.delay,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                    }}
                  >
                    {particle.iconType === 0 ? (
                      <Star 
                        size={particle.starSize} 
                        weight="fill" 
                        color={particle.starColor}
                      />
                    ) : particle.iconType === 1 ? (
                      <Sparkle 
                        size={particle.sparkleSize} 
                        weight="fill" 
                        color={particle.sparkleColor}
                      />
                    ) : particle.iconType === 2 ? (
                      <Trophy 
                        size={particle.trophySize} 
                        weight="fill" 
                        color={particle.trophyColor}
                      />
                    ) : (
                      <Medal 
                        size={particle.medalSize} 
                        weight="fill" 
                        color={particle.medalColor}
                      />
                    )}
                  </motion.div>
                )
              })}
            </Box>
          )}

          <motion.div
            animate={isComplete ? { 
              scale: [1, 1.02, 1],
            } : {}}
            transition={{ 
              duration: 0.5,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          >
            <Card
              sx={{
                backgroundColor: isComplete 
                  ? 'oklch(0.15 0.06 150 / 0.95)' 
                  : 'oklch(0.12 0.02 250 / 0.95)',
                backdropFilter: 'blur(20px)',
                border: isComplete 
                  ? '2px solid oklch(0.65 0.15 150 / 0.6)' 
                  : '1px solid oklch(0.55 0.12 230 / 0.3)',
                boxShadow: isComplete 
                  ? '0 12px 48px oklch(0.65 0.15 150 / 0.4), 0 0 80px oklch(0.65 0.15 150 / 0.2)' 
                  : '0 8px 32px oklch(0 0 0 / 0.6)',
                width: '100%',
                maxWidth: '500px',
                transition: 'all 0.5s ease',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {isComplete ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: 'spring',
                          stiffness: 260,
                          damping: 12,
                          delay: 0.1
                        }}
                      >
                        <CheckCircle size={28} weight="fill" color="oklch(0.75 0.25 150)" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Cube size={28} weight="duotone" color="oklch(0.65 0.25 230)" />
                      </motion.div>
                    )}
                    
                    <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: '1.1rem',
                          color: isComplete ? 'oklch(0.75 0.25 150)' : 'oklch(0.98 0.01 0)',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {isComplete ? '🎉 Generation Complete!' : label}
                      </Typography>
                      {type && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: isComplete ? 'oklch(0.65 0.15 150)' : 'oklch(0.65 0.25 230)', 
                            textTransform: 'capitalize',
                            fontSize: '0.85rem',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {type}
                        </Typography>
                      )}
                      {seed && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: isComplete ? 'oklch(0.55 0.12 150)' : 'oklch(0.55 0.12 230)', 
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          Seed: {seed}
                        </Typography>
                      )}
                    </Stack>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: isComplete ? 'oklch(0.75 0.25 150)' : 'oklch(0.65 0.25 230)',
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        flexShrink: 0,
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {Math.round(progress)}%
                    </Typography>
                  </Stack>

                  <Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress} 
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: isComplete ? 'oklch(0.25 0.08 150)' : 'oklch(0.25 0.05 250)',
                        transition: 'background-color 0.3s ease',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: isComplete ? 'oklch(0.75 0.25 150)' : 'oklch(0.65 0.25 230)',
                          borderRadius: 4,
                          transition: 'background-color 0.3s ease, transform 0.3s ease',
                        }
                      }}
                    />
                  </Box>

                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Stack 
                        direction="row" 
                        spacing={1} 
                        sx={{ 
                          pt: 1,
                          flexWrap: 'wrap',
                          gap: 1
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
                        >
                          <Chip 
                            icon={<Trophy size={16} weight="fill" />}
                            label="Map Created"
                            size="small"
                            sx={{ 
                              backgroundColor: 'oklch(0.65 0.25 150 / 0.25)',
                              color: 'oklch(0.80 0.25 150)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              border: '1px solid oklch(0.65 0.25 150 / 0.4)',
                              boxShadow: '0 2px 8px oklch(0.65 0.25 150 / 0.2)'
                            }}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
                        >
                          <Chip 
                            icon={<Lightning size={16} weight="fill" />}
                            label={`${(progress / 20).toFixed(1)}s`}
                            size="small"
                            sx={{ 
                              backgroundColor: 'oklch(0.65 0.25 50 / 0.25)',
                              color: 'oklch(0.80 0.25 50)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              border: '1px solid oklch(0.65 0.25 50 / 0.4)',
                              boxShadow: '0 2px 8px oklch(0.65 0.25 50 / 0.2)'
                            }}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
                        >
                          <Chip 
                            icon={<Star size={16} weight="fill" />}
                            label="+100 XP"
                            size="small"
                            sx={{ 
                              backgroundColor: 'oklch(0.65 0.25 280 / 0.25)',
                              color: 'oklch(0.80 0.25 280)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              border: '1px solid oklch(0.65 0.25 280 / 0.4)',
                              boxShadow: '0 2px 8px oklch(0.65 0.25 280 / 0.2)'
                            }}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 15 }}
                        >
                          <Chip 
                            icon={<Target size={16} weight="fill" />}
                            label="Achievement Unlocked"
                            size="small"
                            sx={{ 
                              backgroundColor: 'oklch(0.65 0.25 230 / 0.25)',
                              color: 'oklch(0.80 0.25 230)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              border: '1px solid oklch(0.65 0.25 230 / 0.4)',
                              boxShadow: '0 2px 8px oklch(0.65 0.25 230 / 0.2)'
                            }}
                          />
                        </motion.div>
                      </Stack>
                    </motion.div>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
