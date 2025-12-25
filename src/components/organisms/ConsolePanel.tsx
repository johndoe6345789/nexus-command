import { Box, TextField, Typography } from '@mui/material'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh'

interface ConsolePanelProps {
  output: string[]
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function ConsolePanel({ output, input, onInputChange, onSubmit }: ConsolePanelProps) {
  const consoleContainerRef = useRef<HTMLDivElement>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (consoleContainerRef.current) {
      const element = consoleContainerRef.current
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [output])

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    setRefreshKey(prev => prev + 1)
  }

  const { isPulling, isRefreshing, pullDistance, progress, scrollableRef } = 
    usePullToRefresh({ onRefresh: handleRefresh })

  const showIndicator = isPulling || isRefreshing
  const rotation = isRefreshing ? 360 : progress * 360

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <AnimatePresence>
          {showIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isRefreshing ? 1 : Math.max(0.3, progress),
                y: Math.min(pullDistance * 0.3, 40)
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 50,
                pointerEvents: 'none',
                top: -10,
              }}
            >
              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.9) 0%, oklch(0.65 0.18 220 / 0.7) 100%)',
                    border: '2px solid oklch(0.98 0.01 250 / 0.2)',
                    boxShadow: '0 4px 24px oklch(0.75 0.20 220 / 0.3)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <ArrowsClockwise
                    size={24}
                    weight="bold"
                    style={{
                      color: 'oklch(0.98 0.01 250)',
                      transform: isRefreshing ? undefined : `rotate(${rotation}deg)`,
                      transition: 'transform 0.2s',
                    }}
                    className={isRefreshing ? 'animate-spin' : ''}
                  />
                </div>
                
                {!isRefreshing && progress < 1 && (
                  <svg 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: 48,
                      height: 48,
                      transform: 'rotate(-90deg)',
                    }}
                    viewBox="0 0 48 48"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="oklch(0.98 0.01 250 / 0.4)"
                      strokeWidth="3"
                      strokeDasharray={`${progress * 126} 126`}
                    />
                  </svg>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Box
          ref={(el: HTMLDivElement | null) => {
            consoleContainerRef.current = el
            if (el) {
              scrollableRef.current = el
            }
          }}
          key={refreshKey}
          sx={{
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 2,
            p: 3,
            mb: 2,
            height: '500px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            border: '1px solid rgba(74, 158, 255, 0.3)',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            transform: showIndicator ? `translateY(${Math.min(pullDistance * 0.2, 20)}px)` : undefined,
            transition: isRefreshing || !isPulling ? 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
        >
          {output.map((line, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: line.startsWith('>')
                  ? 'oklch(0.75 0.20 220)'
                  : 'oklch(0.85 0.05 220)',
                fontFamily: 'monospace',
                mb: 0.5,
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Box>

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter command..."
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <Typography sx={{ mr: 1, color: 'oklch(0.75 0.20 220)' }}>
                  &gt;
                </Typography>
              ),
              sx: {
                fontFamily: 'monospace',
              },
            },
          }}
        />
      </form>
    </>
  )
}
