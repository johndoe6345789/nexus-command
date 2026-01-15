import { describe, it, expect, vi } from 'vitest'
import { createHexagon, updateHexagon, drawHexagon, Hexagon } from '../hexagon'

describe('hexagon', () => {
  describe('createHexagon', () => {
    it('should create a hexagon with valid properties', () => {
      const hexagon = createHexagon(800, 600)
      
      expect(hexagon).toHaveProperty('x')
      expect(hexagon).toHaveProperty('y')
      expect(hexagon).toHaveProperty('size')
      expect(hexagon).toHaveProperty('rotation')
      expect(hexagon).toHaveProperty('rotationSpeed')
      expect(hexagon).toHaveProperty('opacity')
    })
    
    it('should create hexagon within canvas bounds', () => {
      const canvasWidth = 1920
      const canvasHeight = 1080
      const hexagon = createHexagon(canvasWidth, canvasHeight)
      
      expect(hexagon.x).toBeGreaterThanOrEqual(0)
      expect(hexagon.x).toBeLessThanOrEqual(canvasWidth)
      expect(hexagon.y).toBeGreaterThanOrEqual(0)
      expect(hexagon.y).toBeLessThanOrEqual(canvasHeight)
    })
    
    it('should create hexagon with size in expected range', () => {
      const hexagon = createHexagon(800, 600)
      
      // Size should be between 50 and 150 (random * 100 + 50)
      expect(hexagon.size).toBeGreaterThanOrEqual(50)
      expect(hexagon.size).toBeLessThanOrEqual(150)
    })
    
    it('should create hexagon with rotation in valid range', () => {
      const hexagon = createHexagon(800, 600)
      
      // Rotation should be between 0 and 2π
      expect(hexagon.rotation).toBeGreaterThanOrEqual(0)
      expect(hexagon.rotation).toBeLessThanOrEqual(Math.PI * 2)
    })
    
    it('should create hexagon with opacity in expected range', () => {
      const hexagon = createHexagon(800, 600)
      
      // Opacity should be between 0.04 and 0.12 (random * 0.08 + 0.04)
      expect(hexagon.opacity).toBeGreaterThanOrEqual(0.04)
      expect(hexagon.opacity).toBeLessThanOrEqual(0.12)
    })
    
    it('should create hexagon with rotation speed in expected range', () => {
      const hexagon = createHexagon(800, 600)
      
      // Rotation speed should be between -0.0015 and 0.0015
      expect(hexagon.rotationSpeed).toBeGreaterThanOrEqual(-0.0015)
      expect(hexagon.rotationSpeed).toBeLessThanOrEqual(0.0015)
    })
    
    it('should create different hexagons on multiple calls', () => {
      const hexagon1 = createHexagon(800, 600)
      const hexagon2 = createHexagon(800, 600)
      
      // Due to randomness, at least some properties should differ
      const allSame = 
        hexagon1.x === hexagon2.x &&
        hexagon1.y === hexagon2.y &&
        hexagon1.size === hexagon2.size &&
        hexagon1.rotation === hexagon2.rotation &&
        hexagon1.opacity === hexagon2.opacity
      
      expect(allSame).toBe(false)
    })
  })
  
  describe('updateHexagon', () => {
    it('should update hexagon rotation', () => {
      const hexagon: Hexagon = {
        x: 100,
        y: 100,
        size: 80,
        rotation: 0,
        rotationSpeed: 0.01,
        opacity: 0.06,
      }
      
      const initialRotation = hexagon.rotation
      updateHexagon(hexagon)
      
      expect(hexagon.rotation).toBe(initialRotation + 0.01)
    })
    
    it('should update rotation based on rotationSpeed', () => {
      const hexagon: Hexagon = {
        x: 100,
        y: 100,
        size: 80,
        rotation: 1.5,
        rotationSpeed: 0.003,
        opacity: 0.06,
      }
      
      updateHexagon(hexagon)
      
      expect(hexagon.rotation).toBe(1.503)
    })
    
    it('should handle negative rotation speed', () => {
      const hexagon: Hexagon = {
        x: 100,
        y: 100,
        size: 80,
        rotation: 2.0,
        rotationSpeed: -0.002,
        opacity: 0.06,
      }
      
      updateHexagon(hexagon)
      
      expect(hexagon.rotation).toBe(1.998)
    })
    
    it('should update rotation multiple times', () => {
      const hexagon: Hexagon = {
        x: 100,
        y: 100,
        size: 80,
        rotation: 0,
        rotationSpeed: 0.1,
        opacity: 0.06,
      }
      
      updateHexagon(hexagon)
      expect(hexagon.rotation).toBeCloseTo(0.1)
      
      updateHexagon(hexagon)
      expect(hexagon.rotation).toBeCloseTo(0.2)
      
      updateHexagon(hexagon)
      expect(hexagon.rotation).toBeCloseTo(0.3)
    })
  })
  
  describe('drawHexagon', () => {
    it('should call canvas drawing methods', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const hexagon: Hexagon = {
        x: 100,
        y: 100,
        size: 50,
        rotation: 0,
        rotationSpeed: 0.01,
        opacity: 0.06,
      }
      
      drawHexagon(mockCtx, hexagon)
      
      expect(mockCtx.beginPath).toHaveBeenCalledOnce()
      expect(mockCtx.moveTo).toHaveBeenCalledOnce()
      expect(mockCtx.lineTo).toHaveBeenCalledTimes(5)
      expect(mockCtx.closePath).toHaveBeenCalledOnce()
      expect(mockCtx.stroke).toHaveBeenCalledOnce()
    })
    
    it('should set correct stroke style with opacity', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const hexagon: Hexagon = {
        x: 100,
        y: 100,
        size: 50,
        rotation: 0,
        rotationSpeed: 0.01,
        opacity: 0.08,
      }
      
      drawHexagon(mockCtx, hexagon)
      
      expect(mockCtx.strokeStyle).toBe('rgba(125, 185, 255, 0.08)')
      expect(mockCtx.lineWidth).toBe(1.5)
    })
    
    it('should draw hexagon at correct position', () => {
      const mockCtx = {
        strokeStyle: '',
        lineWidth: 0,
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
      } as unknown as CanvasRenderingContext2D
      
      const hexagon: Hexagon = {
        x: 200,
        y: 150,
        size: 60,
        rotation: 0,
        rotationSpeed: 0.01,
        opacity: 0.06,
      }
      
      drawHexagon(mockCtx, hexagon)
      
      // First point should be moveTo at (x + size, y)
      expect(mockCtx.moveTo).toHaveBeenCalledWith(
        expect.closeTo(260, 0.1),
        expect.closeTo(150, 0.1)
      )
    })
  })
})
