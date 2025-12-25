import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircularProgress, Box } from '@mui/material'
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh'

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: ReactNode
  enabled?: boolean
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  enabled = true 
}: PullToRefreshProps) {
  const { isPulling, isRefreshing, pullDistance, progress, scrollableRef } = 
    usePullToRefresh({ onRefresh, enabled })

  const showIndicator = isPulling || isRefreshing

  return (
    <Box sx={{ position: 'relative' }}>
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isRefreshing ? 1 : Math.max(0.4, progress),
              scale: isRefreshing ? 1 : Math.max(0.85, progress),
              y: Math.min(pullDistance * 0.5, 50)
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              pointerEvents: 'none',
              top: -10
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(100, 150, 255, 0.15), rgba(100, 120, 255, 0.15))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(100, 150, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(100, 150, 255, 0.2)',
              }}
            >
              {isRefreshing ? (
                <CircularProgress size={32} thickness={4} />
              ) : (
                <CircularProgress variant="determinate" value={progress * 100} size={32} thickness={4} />
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <Box 
        ref={scrollableRef}
        sx={{
          position: 'relative',
          transform: showIndicator ? `translateY(${Math.min(pullDistance * 0.6, 80)}px)` : 'none',
          transition: isRefreshing || !isPulling ? 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
