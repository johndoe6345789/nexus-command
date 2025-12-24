import { Particle, createParticle, updateParticle, drawParticle, drawParticleConnections } from './particle'
import { Hexagon, createHexagon, updateHexagon, drawHexagon } from './hexagon'

export interface RendererConfig {
  particleCount?: number
  hexagonCount?: number
  particleColors?: string[]
  connectionDistance?: number
}

export class CanvasRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private hexagons: Hexagon[] = []
  private animationFrameId: number | null = null
  private config: Required<RendererConfig>

  constructor(canvas: HTMLCanvasElement, config: RendererConfig = {}) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas')
    }
    this.ctx = ctx

    this.config = {
      particleCount: config.particleCount ?? 80,
      hexagonCount: config.hexagonCount ?? 8,
      particleColors: config.particleColors ?? [
        'rgba(125, 185, 255, 0.6)',
        'rgba(255, 165, 100, 0.4)',
        'rgba(180, 220, 255, 0.5)',
      ],
      connectionDistance: config.connectionDistance ?? 150,
    }

    this.resize()
    this.initializeParticles()
    this.initializeHexagons()
  }

  private resize(): void {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  private initializeParticles(): void {
    this.particles = []
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(
        createParticle(
          this.canvas.width,
          this.canvas.height,
          this.config.particleColors
        )
      )
    }
  }

  private initializeHexagons(): void {
    this.hexagons = []
    for (let i = 0; i < this.config.hexagonCount; i++) {
      this.hexagons.push(
        createHexagon(this.canvas.width, this.canvas.height)
      )
    }
  }

  private clearCanvas(): void {
    this.ctx.fillStyle = 'rgba(15, 15, 20, 0.1)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private renderHexagons(): void {
    this.hexagons.forEach((hexagon) => {
      updateHexagon(hexagon)
      drawHexagon(this.ctx, hexagon)
    })
  }

  private renderParticles(): void {
    this.particles.forEach((particle) => {
      updateParticle(particle, this.canvas.width, this.canvas.height)
      drawParticle(this.ctx, particle)
    })
    drawParticleConnections(this.ctx, this.particles, this.config.connectionDistance)
  }

  private animate = (): void => {
    this.clearCanvas()
    this.renderHexagons()
    this.renderParticles()
    this.animationFrameId = requestAnimationFrame(this.animate)
  }

  public start(): void {
    if (this.animationFrameId === null) {
      this.animate()
    }
  }

  public stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  public handleResize = (): void => {
    this.resize()
  }

  public destroy(): void {
    this.stop()
  }
}
