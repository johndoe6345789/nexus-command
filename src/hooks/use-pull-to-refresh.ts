import { useEffect, useRef, useState } from 'react'

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void
  threshold?: number
  enabled?: boolean
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  enabled = true,
}: UsePullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const scrollableRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled) return

    const handleTouchStart = (e: TouchEvent) => {
      const scrollable = scrollableRef.current
      if (!scrollable) return

      if (scrollable.scrollTop <= 0) {
        startY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const scrollable = scrollableRef.current
      if (!scrollable || isRefreshing) return

      if (scrollable.scrollTop <= 0 && startY.current > 0) {
        const currentY = e.touches[0].clientY
        const distance = Math.max(0, currentY - startY.current)

        if (distance > 0) {
          e.preventDefault()
          setIsPulling(true)
          setPullDistance(Math.min(distance, threshold * 1.5))
        }
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling || isRefreshing) {
        setIsPulling(false)
        setPullDistance(0)
        startY.current = 0
        return
      }

      if (pullDistance >= threshold) {
        setIsRefreshing(true)
        setPullDistance(threshold)
        
        try {
          await onRefresh()
        } finally {
          setTimeout(() => {
            setIsRefreshing(false)
            setIsPulling(false)
            setPullDistance(0)
            startY.current = 0
          }, 300)
        }
      } else {
        setIsPulling(false)
        setPullDistance(0)
        startY.current = 0
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, isPulling, isRefreshing, pullDistance, threshold, onRefresh])

  const progress = Math.min(pullDistance / threshold, 1)

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    progress,
    scrollableRef,
  }
}
