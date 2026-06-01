import { useEffect, useRef } from 'react'
import { CanvasRenderer } from '@/lib/canvas/renderer'

const fixedLayerStyle = {
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: -2,
} as const

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<CanvasRenderer | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const isMobile = window.innerWidth < 640
      const isTablet = window.innerWidth < 1024

      rendererRef.current = new CanvasRenderer(canvas, {
        particleCount: isMobile ? 24 : isTablet ? 36 : 48,
        hexagonCount: isMobile ? 2 : isTablet ? 3 : 4,
        connectionDistance: isMobile ? 90 : isTablet ? 110 : 130,
        particleColors: [
          'rgba(91, 143, 199, 0.2)',
          'rgba(201, 151, 88, 0.14)',
          'rgba(136, 179, 217, 0.18)',
        ],
      })

      rendererRef.current.start()

      window.addEventListener('resize', rendererRef.current.handleResize)

      return () => {
        if (rendererRef.current) {
          window.removeEventListener('resize', rendererRef.current.handleResize)
          rendererRef.current.destroy()
        }
      }
    } catch (error) {
      console.error('Failed to initialize canvas renderer:', error)
    }
  }, [])

  return (
    <>
      <div
        style={{
          ...fixedLayerStyle,
          background:
            'radial-gradient(circle at top, rgba(24, 34, 52, 0.2), transparent 28%), linear-gradient(180deg, rgba(10, 13, 22, 0.96) 0%, rgba(7, 10, 17, 0.94) 45%, rgba(5, 7, 12, 0.98) 100%)',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          ...fixedLayerStyle,
          zIndex: -1,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          ...fixedLayerStyle,
          background:
            'radial-gradient(ellipse at top, rgba(91, 143, 199, 0.12), transparent 52%)',
        }}
      />
      <div
        style={{
          ...fixedLayerStyle,
          background:
            'radial-gradient(ellipse at bottom right, rgba(201, 151, 88, 0.08), transparent 48%)',
        }}
      />
      <div
        style={{
          ...fixedLayerStyle,
          zIndex: -1,
          background:
            'linear-gradient(180deg, rgba(4, 6, 10, 0.18) 0%, rgba(4, 6, 10, 0.08) 28%, rgba(4, 6, 10, 0.3) 100%)',
        }}
      />
    </>
  )
}
