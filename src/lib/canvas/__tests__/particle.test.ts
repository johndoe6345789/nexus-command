import { describe, it, expect, vi } from 'vitest'
import {
  createParticle,
  updateParticle,
  drawParticle,
  drawParticleConnections,
  Particle
} from '../particle'

describe('particle', () => {
  describe('createParticle', () => {
    it('should create a particle with valid properties', () => {
      const colors = ['red', 'blue', 'green']
      const particle = createParticle(800, 600, colors)
      
      expect(particle).toHaveProperty('x')
      expect(particle).toHaveProperty('y')
      expect(particle).toHaveProperty('vx')
      expect(particle).toHaveProperty('vy')
      expect(particle).toHaveProperty('size')
      expect(particle).toHaveProperty('opacity')
      expect(particle).toHaveProperty('color')
    })
    
    it('should create particle within canvas bounds', () => {
      const colors = ['red']
      const canvasWidth = 1920
      const canvasHeight = 1080
      const particle = createParticle(canvasWidth, canvasHeight, colors)
      
      expect(particle.x).toBeGreaterThanOrEqual(0)
      expect(particle.x).toBeLessThanOrEqual(canvasWidth)
      expect(particle.y).toBeGreaterThanOrEqual(0)
      expect(particle.y).toBeLessThanOrEqual(canvasHeight)
    })
    
    it('should create particle with velocity in expected range', () => {
      const colors = ['blue']
      const particle = createParticle(800, 600, colors)
      
      // Velocity should be between -0.15 and 0.15 ((random - 0.5) * 0.3)
      expect(particle.vx).toBeGreaterThanOrEqual(-0.15)
      expect(particle.vx).toBeLessThanOrEqual(0.15)
      expect(particle.vy).toBeGreaterThanOrEqual(-0.15)
      expect(particle.vy).toBeLessThanOrEqual(0.15)
    })
    
    it('should create particle with size in expected range', () => {
      const colors = ['green']
      const particle = createParticle(800, 600, colors)
      
      // Size should be between 1 and 3 (random * 2 + 1)
      expect(particle.size).toBeGreaterThanOrEqual(1)
      expect(particle.size).toBeLessThanOrEqual(3)
    })
    
    it('should create particle with opacity in expected range', () => {
      const colors = ['yellow']
      const particle = createParticle(800, 600, colors)
      
      // Opacity should be between 0.3 and 0.8 (random * 0.5 + 0.3)
      expect(particle.opacity).toBeGreaterThanOrEqual(0.3)
      expect(particle.opacity).toBeLessThanOrEqual(0.8)
    })
    
    it('should select color from provided array', () => {
      const colors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)']
      const particle = createParticle(800, 600, colors)
      
      expect(colors).toContain(particle.color)
    })
    
    it('should create different particles on multiple calls', () => {
      const colors = ['red', 'blue']
      const particle1 = createParticle(800, 600, colors)
      const particle2 = createParticle(800, 600, colors)
      
      // Due to randomness, at least some properties should differ
      const allSame = 
        particle1.x === particle2.x &&
        particle1.y === particle2.y &&
        particle1.vx === particle2.vx &&
        particle1.vy === particle2.vy
      
      expect(allSame).toBe(false)
    })
  })
  
  describe('updateParticle', () => {
    it('should update particle position based on velocity', () => {
      const particle: Particle = {
        x: 100,
        y: 100,
        vx: 2,
        vy: 3,
        size: 2,
        opacity: 0.5,
        color: 'red',
      }
      
      updateParticle(particle, 800, 600)
      
      expect(particle.x).toBe(102)
      expect(particle.y).toBe(103)
    })
    
    it('should reverse horizontal velocity when hitting left edge', () => {
      const particle: Particle = {
        x: 0,
        y: 100,
        vx: -1,
        vy: 1,
        size: 2,
        opacity: 0.5,
        color: 'blue',
      }
      
      const initialVx = particle.vx
      updateParticle(particle, 800, 600)
      
      expect(particle.vx).toBe(-initialVx)
    })
    
    it('should reverse horizontal velocity when hitting right edge', () => {
      const particle: Particle = {
        x: 800,
        y: 100,
        vx: 1,
        vy: 1,
        size: 2,
        opacity: 0.5,
        color: 'green',
      }
      
      const initialVx = particle.vx
      updateParticle(particle, 800, 600)
      
      expect(particle.vx).toBe(-initialVx)
    })
    
    it('should reverse vertical velocity when hitting top edge', () => {
      const particle: Particle = {
        x: 100,
        y: 0,
        vx: 1,
        vy: -1,
        size: 2,
        opacity: 0.5,
        color: 'yellow',
      }
      
      const initialVy = particle.vy
      updateParticle(particle, 800, 600)
      
      expect(particle.vy).toBe(-initialVy)
    })
    
    it('should reverse vertical velocity when hitting bottom edge', () => {
      const particle: Particle = {
        x: 100,
        y: 600,
        vx: 1,
        vy: 1,
        size: 2,
        opacity: 0.5,
        color: 'purple',
      }
      
      const initialVy = particle.vy
      updateParticle(particle, 800, 600)
      
      expect(particle.vy).toBe(-initialVy)
    })
    
    it('should handle particle bouncing on multiple edges', () => {
      const particle: Particle = {
        x: 0,
        y: 0,
        vx: -1,
        vy: -1,
        size: 2,
        opacity: 0.5,
        color: 'orange',
      }
      
      updateParticle(particle, 800, 600)
      
      expect(particle.vx).toBe(1)
      expect(particle.vy).toBe(1)
    })
  })
  
  describe('drawParticle', () => {
    it('should call canvas drawing methods', () => {
      const mockCtx = {
        fillStyle: '',
        beginPath: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particle: Particle = {
        x: 100,
        y: 100,
        vx: 1,
        vy: 1,
        size: 2,
        opacity: 0.5,
        color: 'rgba(255, 0, 0, 0.5)',
      }
      
      drawParticle(mockCtx, particle)
      
      expect(mockCtx.beginPath).toHaveBeenCalledOnce()
      expect(mockCtx.arc).toHaveBeenCalledWith(100, 100, 2, 0, Math.PI * 2)
      expect(mockCtx.fill).toHaveBeenCalledOnce()
    })
    
    it('should set correct fill style', () => {
      const mockCtx = {
        fillStyle: '',
        beginPath: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particle: Particle = {
        x: 50,
        y: 75,
        vx: 0,
        vy: 0,
        size: 1.5,
        opacity: 0.7,
        color: 'rgba(0, 255, 0, 0.7)',
      }
      
      drawParticle(mockCtx, particle)
      
      expect(mockCtx.fillStyle).toBe('rgba(0, 255, 0, 0.7)')
    })
  })
  
  describe('drawParticleConnections', () => {
    it('should draw connections between nearby particles', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particles: Particle[] = [
        { x: 100, y: 100, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'red' },
        { x: 150, y: 100, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'blue' },
      ]
      
      drawParticleConnections(mockCtx, particles, 100)
      
      // Distance is 50, which is less than maxDistance (100)
      expect(mockCtx.beginPath).toHaveBeenCalled()
      expect(mockCtx.moveTo).toHaveBeenCalledWith(100, 100)
      expect(mockCtx.lineTo).toHaveBeenCalledWith(150, 100)
      expect(mockCtx.stroke).toHaveBeenCalled()
    })
    
    it('should not draw connections when particles are too far', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particles: Particle[] = [
        { x: 0, y: 0, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'red' },
        { x: 200, y: 200, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'blue' },
      ]
      
      drawParticleConnections(mockCtx, particles, 100)
      
      // Distance is ~282, which is greater than maxDistance (100)
      expect(mockCtx.beginPath).not.toHaveBeenCalled()
    })
    
    it('should use default max distance if not provided', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particles: Particle[] = [
        { x: 0, y: 0, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'red' },
        { x: 100, y: 0, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'blue' },
      ]
      
      drawParticleConnections(mockCtx, particles)
      
      // Distance is 100, which is less than default maxDistance (150)
      expect(mockCtx.beginPath).toHaveBeenCalled()
    })
    
    it('should handle empty particle array', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particles: Particle[] = []
      
      drawParticleConnections(mockCtx, particles, 150)
      
      expect(mockCtx.beginPath).not.toHaveBeenCalled()
    })
    
    it('should handle single particle', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particles: Particle[] = [
        { x: 100, y: 100, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'red' },
      ]
      
      drawParticleConnections(mockCtx, particles, 150)
      
      // No connections with only one particle
      expect(mockCtx.beginPath).not.toHaveBeenCalled()
    })
    
    it('should set stroke opacity based on distance', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const particles: Particle[] = [
        { x: 0, y: 0, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'red' },
        { x: 50, y: 0, vx: 0, vy: 0, size: 2, opacity: 0.5, color: 'blue' },
      ]
      
      drawParticleConnections(mockCtx, particles, 100)
      
      // Distance is 50, maxDistance is 100
      // Opacity should be 0.15 * (1 - 50/100) = 0.15 * 0.5 = 0.075
      expect(mockCtx.strokeStyle).toContain('0.075')
      expect(mockCtx.lineWidth).toBe(0.5)
    })
  })
})
