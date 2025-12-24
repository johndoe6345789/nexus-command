import { motion } from 'framer-motion'
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

    const geometricShapes: Array<{
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      type: 'triangle' | 'square' | 'hexagon'
      opacity: number
    }> = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.7 ? '#F5A623' : '#6366F1',
      })
    }

    for (let i = 0; i < 8; i++) {
      const types: Array<'triangle' | 'square' | 'hexagon'> = ['triangle', 'square', 'hexagon']
      geometricShapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 30,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.15 + 0.05,
      })
    }

    let scanlineY = 0

    function drawTriangle(x: number, y: number, size: number, rotation: number) {
      if (!ctx) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.moveTo(0, -size / 2)
      ctx.lineTo(size / 2, size / 2)
      ctx.lineTo(-size / 2, size / 2)
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }

    function drawSquare(x: number, y: number, size: number, rotation: number) {
      if (!ctx) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.strokeRect(-size / 2, -size / 2, size, size)
      ctx.restore()
    }

    function drawHexagon(x: number, y: number, size: number, rotation: number) {
      if (!ctx) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = (size / 2) * Math.cos(angle)
        const hy = (size / 2) * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(26, 27, 38, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.globalAlpha = (1 - distance / 150) * 0.2
            ctx.strokeStyle = '#6366F1'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      geometricShapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed
        
        ctx.globalAlpha = shape.opacity
        ctx.strokeStyle = '#F5A623'
        ctx.lineWidth = 2

        if (shape.type === 'triangle') {
          drawTriangle(shape.x, shape.y, shape.size, shape.rotation)
        } else if (shape.type === 'square') {
          drawSquare(shape.x, shape.y, shape.size, shape.rotation)
        } else {
          drawHexagon(shape.x, shape.y, shape.size, shape.rotation)
        }
      })

      ctx.globalAlpha = 0.03
      ctx.fillStyle = '#6366F1'
      ctx.fillRect(0, scanlineY, canvas.width, 2)
      scanlineY = (scanlineY + 3) % canvas.height

      ctx.globalAlpha = 1

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ display: 'block' }}
      />

      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.65 0.25 250 / 0.3) 2px, oklch(0.65 0.25 250 / 0.3) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, oklch(0.65 0.25 250 / 0.3) 2px, oklch(0.65 0.25 250 / 0.3) 4px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute border-2 border-primary/20 pointer-events-none"
          style={{
            width: 100 + i * 40,
            height: 100 + i * 40,
            top: i % 2 === 0 ? 20 : undefined,
            bottom: i % 2 === 1 ? 20 : undefined,
            left: i % 3 === 0 ? 20 : undefined,
            right: i % 3 !== 0 ? 20 : undefined,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, oklch(0.65 0.25 250 / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, oklch(0.70 0.20 40 / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, oklch(0.65 0.25 250 / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, oklch(0.65 0.25 250 / 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
