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
  const isMouseDown = useRef(false)
  const overscrollAccumulator = useRef(0)
  const lastScrollTop = useRef(0)

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

    const handleMouseDown = (e: MouseEvent) => {
      const scrollable = scrollableRef.current
      if (!scrollable || scrollable.scrollTop > 0) return
      
      isMouseDown.current = true
      startY.current = e.clientY
      lastScrollTop.current = scrollable.scrollTop
    }

    const handleMouseMove = (e: MouseEvent) => {
      const scrollable = scrollableRef.current
      if (!scrollable || !isMouseDown.current || isRefreshing) return

      if (scrollable.scrollTop <= 0 && lastScrollTop.current <= 0) {
        const currentY = e.clientY
        const distance = Math.max(0, currentY - startY.current)

        if (distance > 5) {
          setIsPulling(true)
          setPullDistance(Math.min(distance * 0.5, threshold * 1.5))
        }
      }
    }

    const handleMouseUp = async () => {
      if (!isMouseDown.current) return
      
      isMouseDown.current = false
      
      if (!isPulling || isRefreshing) {
        setIsPulling(false)
        setPullDistance(0)
        startY.current = 0
        overscrollAccumulator.current = 0
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
            overscrollAccumulator.current = 0
          }, 300)
        }
      } else {
        setIsPulling(false)
        setPullDistance(0)
        startY.current = 0
        overscrollAccumulator.current = 0
      }
    }

    const handleWheel = async (e: WheelEvent) => {
      const scrollable = scrollableRef.current
      if (!scrollable || isRefreshing || isMouseDown.current) return

      if (scrollable.scrollTop <= 0 && e.deltaY < 0) {
        overscrollAccumulator.current += Math.abs(e.deltaY)
        
        if (overscrollAccumulator.current > 10) {
          setIsPulling(true)
          const distance = Math.min(overscrollAccumulator.current * 0.8, threshold * 1.5)
          setPullDistance(distance)
          
          if (distance >= threshold) {
            overscrollAccumulator.current = 0
            setIsRefreshing(true)
            setPullDistance(threshold)
            
            try {
              await onRefresh()
            } finally {
              setTimeout(() => {
                setIsRefreshing(false)
                setIsPulling(false)
                setPullDistance(0)
              }, 300)
            }
          }
        }
      } else {
        if (overscrollAccumulator.current > 0) {
          overscrollAccumulator.current = Math.max(0, overscrollAccumulator.current - 5)
          if (overscrollAccumulator.current === 0) {
            setIsPulling(false)
            setPullDistance(0)
          }
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('wheel', handleWheel)
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
