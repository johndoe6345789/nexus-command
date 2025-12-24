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
      pulse: number
      pulseSpeed: number
    }> = []

    const geometricShapes: Array<{
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      type: 'triangle' | 'square' | 'hexagon' | 'circle'
      opacity: number
      pulsePhase: number
    }> = []

    const energyLines: Array<{
      startX: number
      startY: number
      endX: number
      endY: number
      opacity: number
      fadeSpeed: number
      color: string
    }> = []

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.6 ? 'oklch(0.72 0.22 45)' : 'oklch(0.68 0.28 245)',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      })
    }

    for (let i = 0; i < 12; i++) {
      const types: Array<'triangle' | 'square' | 'hexagon' | 'circle'> = ['triangle', 'square', 'hexagon', 'circle']
      geometricShapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.20 + 0.08,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let scanlineY = 0
    let frameCount = 0

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

    function drawCircle(x: number, y: number, size: number) {
      if (!ctx) return
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, size / 2, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(20, 21, 32, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        const pulseFactor = Math.sin(p.pulse) * 0.3 + 0.7

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, p.color.replace(')', ` / ${p.opacity * pulseFactor})`))
        gradient.addColorStop(1, p.color.replace(')', ' / 0)'))
        
        ctx.globalAlpha = p.opacity * pulseFactor
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = p.opacity * 0.5
        ctx.strokeStyle = p.color
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 180) {
            const alpha = (1 - distance / 180) * 0.3
            ctx.globalAlpha = alpha
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            )
            gradient.addColorStop(0, particles[i].color)
            gradient.addColorStop(1, particles[j].color)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      geometricShapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed
        shape.pulsePhase += 0.015
        
        const pulseFactor = Math.sin(shape.pulsePhase) * 0.2 + 0.8
        const currentOpacity = shape.opacity * pulseFactor
        
        ctx.globalAlpha = currentOpacity
        ctx.strokeStyle = Math.random() > 0.5 ? 'oklch(0.68 0.28 245)' : 'oklch(0.72 0.22 45)'
        ctx.lineWidth = 2

        if (shape.type === 'triangle') {
          drawTriangle(shape.x, shape.y, shape.size * pulseFactor, shape.rotation)
        } else if (shape.type === 'square') {
          drawSquare(shape.x, shape.y, shape.size * pulseFactor, shape.rotation)
        } else if (shape.type === 'hexagon') {
          drawHexagon(shape.x, shape.y, shape.size * pulseFactor, shape.rotation)
        } else {
          drawCircle(shape.x, shape.y, shape.size * pulseFactor)
        }
      })

      if (frameCount % 120 === 0 && energyLines.length < 8) {
        energyLines.push({
          startX: Math.random() * canvas.width,
          startY: Math.random() * canvas.height,
          endX: Math.random() * canvas.width,
          endY: Math.random() * canvas.height,
          opacity: 0.6,
          fadeSpeed: 0.01,
          color: Math.random() > 0.5 ? 'oklch(0.68 0.28 245)' : 'oklch(0.72 0.22 45)',
        })
      }

      energyLines.forEach((line, index) => {
        line.opacity -= line.fadeSpeed
        if (line.opacity <= 0) {
          energyLines.splice(index, 1)
          return
        }

        ctx.globalAlpha = line.opacity
        ctx.strokeStyle = line.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(line.startX, line.startY)
        ctx.lineTo(line.endX, line.endY)
        ctx.stroke()

        const gradient = ctx.createRadialGradient(
          line.endX, line.endY, 0,
          line.endX, line.endY, 20
        )
        gradient.addColorStop(0, line.color.replace(')', ` / ${line.opacity})`))
        gradient.addColorStop(1, line.color.replace(')', ' / 0)'))
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(line.endX, line.endY, 20, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 0.04
      ctx.fillStyle = 'oklch(0.68 0.28 245)'
      ctx.fillRect(0, scanlineY, canvas.width, 2)
      ctx.fillRect(0, scanlineY + canvas.height / 2, canvas.width, 1)
      scanlineY = (scanlineY + 4) % canvas.height

      ctx.globalAlpha = 1
      frameCount++

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
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/80 to-background" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
        style={{ display: 'block' }}
      />

      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 3px, oklch(0.68 0.28 245 / 0.4) 3px, oklch(0.68 0.28 245 / 0.4) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 3px, oklch(0.68 0.28 245 / 0.4) 3px, oklch(0.68 0.28 245 / 0.4) 4px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute border-2 pointer-events-none"
          style={{
            width: 120 + i * 50,
            height: 120 + i * 50,
            top: i % 2 === 0 ? 30 : undefined,
            bottom: i % 2 === 1 ? 30 : undefined,
            left: i % 3 === 0 ? 30 : undefined,
            right: i % 3 !== 0 ? 30 : undefined,
            borderColor: i % 2 === 0 ? 'oklch(0.68 0.28 245 / 0.15)' : 'oklch(0.72 0.22 45 / 0.15)',
            boxShadow: `0 0 30px ${i % 2 === 0 ? 'oklch(0.68 0.28 245 / 0.1)' : 'oklch(0.72 0.22 45 / 0.1)'}`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25 + i * 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, oklch(0.68 0.28 245 / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, oklch(0.72 0.22 45 / 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, oklch(0.68 0.28 245 / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, oklch(0.72 0.22 45 / 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, oklch(0.68 0.28 245 / 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
