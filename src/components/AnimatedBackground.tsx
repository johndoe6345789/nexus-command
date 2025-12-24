import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const particleCount = 80
    const colors = [
      'rgba(125, 185, 255, 0.6)',
      'rgba(255, 165, 100, 0.4)',
      'rgba(180, 220, 255, 0.5)',
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const hexagons: Array<{
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
    }> = []

    for (let i = 0; i < 8; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        opacity: Math.random() * 0.08 + 0.04,
      })
    }

    function drawHexagon(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number
    ) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
    }

    let animationFrameId: number

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(15, 15, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      hexagons.forEach((hex) => {
        hex.rotation += hex.rotationSpeed
        ctx.strokeStyle = `rgba(125, 185, 255, ${hex.opacity})`
        ctx.lineWidth = 1.5
        drawHexagon(ctx, hex.x, hex.y, hex.size, hex.rotation)
        ctx.stroke()
      })

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(125, 185, 255, ${0.15 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
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
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.15_0.08_220_/_0.3),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.12_0.06_35_/_0.2),transparent_50%)]" />
    </>
  )
}
