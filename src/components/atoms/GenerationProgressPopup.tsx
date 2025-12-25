import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, Stack, Typography, LinearProgress, Box, Chip } from '@mui/material'
import { Cube, Trophy, Lightning, Star, CheckCircle } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

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
  const [isComplete, setIsComplete] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      setIsComplete(true)
      setShowCelebration(true)
      const timer = setTimeout(() => {
        setShowCelebration(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setIsComplete(false)
    }
  }, [progress, isVisible])

  const particles = Array.from({ length: 12 }, (_, i) => i)

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
            <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
              {particles.map((i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1, 
                    y: 50, 
                    x: 0,
                    scale: 1,
                  }}
                  animate={{ 
                    opacity: 0, 
                    y: -80 + Math.random() * 40,
                    x: (Math.random() - 0.5) * 200,
                    scale: 0.2,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ 
                    duration: 1.2 + Math.random() * 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <Star 
                    size={16 + Math.random() * 16} 
                    weight="fill" 
                    color={`oklch(${0.65 + Math.random() * 0.2} ${0.2 + Math.random() * 0.1} ${200 + Math.random() * 80})`}
                  />
                </motion.div>
              ))}
            </Box>
          )}

          <Card
            sx={{
              backgroundColor: isComplete 
                ? 'oklch(0.15 0.06 150 / 0.95)' 
                : 'oklch(0.12 0.02 250 / 0.95)',
              backdropFilter: 'blur(20px)',
              border: isComplete 
                ? '1px solid oklch(0.65 0.15 150 / 0.5)' 
                : '1px solid oklch(0.55 0.12 230 / 0.3)',
              boxShadow: isComplete 
                ? '0 8px 32px oklch(0.65 0.15 150 / 0.3)' 
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
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 300,
                        damping: 15
                      }}
                    >
                      <CheckCircle size={24} weight="fill" color="oklch(0.75 0.25 150)" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Cube size={24} weight="duotone" color="oklch(0.65 0.25 230)" />
                    </motion.div>
                  )}
                  
                  <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 700, 
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
                      fontSize: '0.9rem',
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
                    transition={{ duration: 0.3, delay: 0.2 }}
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
                      <Chip 
                        icon={<Trophy size={16} weight="fill" />}
                        label="Map Created"
                        size="small"
                        sx={{ 
                          backgroundColor: 'oklch(0.65 0.25 150 / 0.2)',
                          color: 'oklch(0.75 0.25 150)',
                          fontWeight: 600,
                          border: '1px solid oklch(0.65 0.25 150 / 0.3)'
                        }}
                      />
                      <Chip 
                        icon={<Lightning size={16} weight="fill" />}
                        label={`${(progress / 20).toFixed(1)}s`}
                        size="small"
                        sx={{ 
                          backgroundColor: 'oklch(0.65 0.25 50 / 0.2)',
                          color: 'oklch(0.75 0.25 50)',
                          fontWeight: 600,
                          border: '1px solid oklch(0.65 0.25 50 / 0.3)'
                        }}
                      />
                      <Chip 
                        icon={<Star size={16} weight="fill" />}
                        label="+100 XP"
                        size="small"
                        sx={{ 
                          backgroundColor: 'oklch(0.65 0.25 280 / 0.2)',
                          color: 'oklch(0.75 0.25 280)',
                          fontWeight: 600,
                          border: '1px solid oklch(0.65 0.25 280 / 0.3)'
                        }}
                      />
                    </Stack>
                  </motion.div>
                )}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
