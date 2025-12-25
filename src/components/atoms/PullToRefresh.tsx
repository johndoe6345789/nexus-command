import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircularProgress, Box } from '@mui/material'
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh'
import { cn } from '@/lib/utils'

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: ReactNode
  className?: string
  enabled?: boolean
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  className,
  enabled = true 
}: PullToRefreshProps) {
  const { isPulling, isRefreshing, pullDistance, progress, scrollableRef } = 
    usePullToRefresh({ onRefresh, enabled })

  const showIndicator = isPulling || isRefreshing

  return (
    <div className={cn('relative', className)}>
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
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ top: -10 }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, oklch(0.65 0.25 230 / 0.15) 0%, oklch(0.55 0.20 240 / 0.15) 100%)',
                backdropFilter: 'blur(20px)',
                border: '2px solid oklch(0.65 0.25 230 / 0.3)',
                boxShadow: '0 8px 32px oklch(0.65 0.25 230 / 0.2), inset 0 1px 2px oklch(1 0 0 / 0.1)',
              }}
            >
              {isRefreshing ? (
                <CircularProgress
                  size={32}
                  thickness={4}
                  sx={{
                    color: 'oklch(0.70 0.25 230)',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }}
                />
              ) : (
                <CircularProgress
                  variant="determinate"
                  value={progress * 100}
                  size={32}
                  thickness={4}
                  sx={{
                    color: 'oklch(0.70 0.25 230)',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }}
                />
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={(el) => {
          if (el) {
            scrollableRef.current = el
          }
        }}
        className="relative"
        style={{
          transform: showIndicator ? `translateY(${Math.min(pullDistance * 0.6, 80)}px)` : undefined,
          transition: isRefreshing || !isPulling ? 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
