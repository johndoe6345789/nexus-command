import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, Stack, Typography, LinearProgress, Box } from '@mui/material'
import { Cube } from '@phosphor-icons/react'

interface GenerationProgressPopupProps {
  isVisible: boolean
  progress: number
  label?: string
  type?: string
}

export function GenerationProgressPopup({ 
  isVisible, 
  progress, 
  label = 'Generating...', 
  type 
}: GenerationProgressPopupProps) {
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
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'min(500px, calc(100vw - 48px))',
          }}
        >
          <Card
            sx={{
              backgroundColor: 'oklch(0.12 0.02 250 / 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid oklch(0.55 0.12 230 / 0.3)',
              boxShadow: '0 8px 32px oklch(0 0 0 / 0.6)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Cube size={24} weight="duotone" color="oklch(0.65 0.25 230)" />
                  </motion.div>
                  <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'oklch(0.98 0.01 0)' }}>
                      {label}
                    </Typography>
                    {type && (
                      <Typography variant="caption" sx={{ color: 'oklch(0.65 0.25 230)', textTransform: 'capitalize' }}>
                        {type}
                      </Typography>
                    )}
                  </Stack>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 700, 
                      color: 'oklch(0.65 0.25 230)',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      flexShrink: 0,
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
                      backgroundColor: 'oklch(0.25 0.05 250)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'oklch(0.65 0.25 230)',
                        borderRadius: 4,
                        transition: 'transform 0.3s ease',
                      }
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
