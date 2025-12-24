import { useEffect, useRef } from 'react'
import { CanvasRenderer } from '@/lib/canvas/renderer'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<CanvasRenderer | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      rendererRef.current = new CanvasRenderer(canvas, {
        particleCount: 80,
        hexagonCount: 8,
        connectionDistance: 150,
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
      <div className="fixed inset-0 bg-gradient-to-br from-[oklch(0.08_0.02_250)] via-[oklch(0.06_0.03_240)] to-[oklch(0.04_0.02_230)]" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.12_0.05_230_/_0.2),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.10_0.04_40_/_0.15),transparent_50%)]" />
    </>
  )
}
