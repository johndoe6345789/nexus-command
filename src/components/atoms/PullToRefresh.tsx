import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isRefreshing ? 1 : Math.max(0.3, progress),
              y: Math.min(pullDistance * 0.5, 50)
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ top: -10 }}
          >
            <div className="relative">
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br from-primary/90 to-primary/70",
                  "border-2 border-primary-foreground/20",
                  "shadow-lg shadow-primary/30",
                  "backdrop-blur-xl"
                )}
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : { rotate: progress * 360 }}
                  transition={
                    isRefreshing 
                      ? { duration: 1, repeat: Infinity, ease: 'linear' }
                      : { duration: 0 }
                  }
                >
                  <RefreshCw
                    size={24}
                    strokeWidth={2.5}
                    className="text-primary-foreground"
                  />
                </motion.div>
              </div>
              
              {!isRefreshing && progress < 1 && (
                <svg 
                  className="absolute inset-0 w-12 h-12 -rotate-90"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${progress * 126} 126`}
                    className="text-primary-foreground/40"
                  />
                </svg>
              )}
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
