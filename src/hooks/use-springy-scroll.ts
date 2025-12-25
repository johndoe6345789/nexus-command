import { useEffect, RefObject } from 'react'

interface SpringyScrollOptions {
  stiffness?: number
  damping?: number
  mass?: number
}

export function useSpringyScroll(
  ref: RefObject<HTMLElement>,
  options: SpringyScrollOptions = {}
) {
  const {
    stiffness = 0.1,
    damping = 0.8,
    mass = 1
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let velocity = 0
    let targetScroll = element.scrollTop
    let currentScroll = element.scrollTop
    let isScrolling = false
    let animationFrame: number
    let lastTouchY = 0
    let lastTimestamp = 0

    const animate = () => {
      const spring = (targetScroll - currentScroll) * stiffness
      const damper = velocity * damping
      const acceleration = (spring - damper) / mass

      velocity += acceleration
      currentScroll += velocity

      if (Math.abs(velocity) > 0.1 || Math.abs(targetScroll - currentScroll) > 0.1) {
        element.scrollTop = currentScroll
        animationFrame = requestAnimationFrame(animate)
      } else {
        isScrolling = false
        currentScroll = targetScroll
        element.scrollTop = targetScroll
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetScroll = Math.max(0, Math.min(
        element.scrollHeight - element.clientHeight,
        targetScroll + e.deltaY
      ))

      if (!isScrolling) {
        isScrolling = true
        currentScroll = element.scrollTop
        animate()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY
      lastTimestamp = Date.now()
      velocity = 0
      isScrolling = false
      cancelAnimationFrame(animationFrame)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const deltaY = lastTouchY - touchY
      const now = Date.now()
      const deltaTime = now - lastTimestamp

      lastTouchY = touchY
      lastTimestamp = now

      targetScroll = Math.max(0, Math.min(
        element.scrollHeight - element.clientHeight,
        element.scrollTop + deltaY
      ))
      
      velocity = deltaY / (deltaTime || 1) * 10
      currentScroll = element.scrollTop
      element.scrollTop = targetScroll
    }

    const handleTouchEnd = () => {
      if (Math.abs(velocity) > 0.5) {
        isScrolling = true
        currentScroll = element.scrollTop
        targetScroll = Math.max(0, Math.min(
          element.scrollHeight - element.clientHeight,
          currentScroll + velocity * 50
        ))
        animate()
      }
    }

    element.addEventListener('wheel', handleWheel, { passive: false })
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('wheel', handleWheel)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrame)
    }
  }, [ref, stiffness, damping, mass])
}
