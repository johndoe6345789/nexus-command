import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
            <div className="relative">
              <div 
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center",
                  "relative overflow-hidden"
                )}
                style={{
                  background: 'linear-gradient(135deg, oklch(0.65 0.25 230 / 0.15) 0%, oklch(0.55 0.20 240 / 0.15) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid oklch(0.65 0.25 230 / 0.3)',
                  boxShadow: '0 8px 32px oklch(0.65 0.25 230 / 0.2), inset 0 1px 2px oklch(1 0 0 / 0.1)',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, oklch(0.65 0.25 230 / 0.0) 0%, oklch(0.65 0.25 230 / 0.5) 50%, oklch(0.65 0.25 230 / 0.0) 100%)',
                  }}
                  animate={isRefreshing ? { 
                    rotate: 360,
                  } : { 
                    rotate: progress * 360 
                  }}
                  transition={
                    isRefreshing 
                      ? { duration: 1.5, repeat: Infinity, ease: 'linear' }
                      : { duration: 0.1 }
                  }
                />

                <motion.div
                  className="relative z-10 flex items-center justify-center w-7 h-7"
                  animate={isRefreshing ? { 
                    rotate: 360
                  } : {}}
                  transition={
                    isRefreshing 
                      ? { duration: 0.8, repeat: Infinity, ease: 'linear' }
                      : {}
                  }
                >
                  <motion.div
                    className="absolute w-6 h-6 rounded-full"
                    style={{
                      border: '3px solid transparent',
                      borderTopColor: 'oklch(0.75 0.25 230)',
                      borderRightColor: 'oklch(0.70 0.23 235)',
                    }}
                    animate={isRefreshing ? { 
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={
                      isRefreshing 
                        ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                        : {}
                    }
                  />
                  <motion.div
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                      border: '2.5px solid transparent',
                      borderBottomColor: 'oklch(0.65 0.22 240)',
                      borderLeftColor: 'oklch(0.60 0.20 245)',
                    }}
                    animate={isRefreshing ? { 
                      rotate: -360,
                      scale: [1, 0.9, 1]
                    } : {}}
                    transition={
                      isRefreshing 
                        ? { 
                            rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                          }
                        : {}
                    }
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.70 0.25 230), oklch(0.65 0.22 240))',
                    }}
                    animate={isRefreshing ? { 
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    } : {
                      scale: progress
                    }}
                    transition={
                      isRefreshing 
                        ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.1 }
                    }
                  />
                </motion.div>

                {!isRefreshing && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: progress >= 1 ? [1, 1.2] : 1,
                      opacity: progress >= 1 ? [0.5, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      border: '3px solid oklch(0.65 0.25 230)',
                    }}
                  />
                )}
              </div>
            </div>
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
