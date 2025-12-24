export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function createParticle(
  canvasWidth: number,
  canvasHeight: number,
  colors: string[]
): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }
}

export function updateParticle(
  particle: Particle,
  canvasWidth: number,
  canvasHeight: number
): void {
  particle.x += particle.vx
  particle.y += particle.vy

  if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1
  if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1
}

export function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle
): void {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.fillStyle = particle.color
  ctx.fill()
}

export function drawParticleConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  maxDistance: number = 150
): void {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const particle = particles[i]
      const other = particles[j]
      const dx = particle.x - other.x
      const dy = particle.y - other.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(other.x, other.y)
        ctx.strokeStyle = `rgba(125, 185, 255, ${0.15 * (1 - distance / maxDistance)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}
