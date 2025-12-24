export interface Hexagon {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
}

export function createHexagon(
  canvasWidth: number,
  canvasHeight: number
): Hexagon {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 100 + 50,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.003,
    opacity: Math.random() * 0.08 + 0.04,
  }
}

export function updateHexagon(hexagon: Hexagon): void {
  hexagon.rotation += hexagon.rotationSpeed
}

export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  hexagon: Hexagon
): void {
  ctx.strokeStyle = `rgba(125, 185, 255, ${hexagon.opacity})`
  ctx.lineWidth = 1.5
  
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + hexagon.rotation
    const px = hexagon.x + hexagon.size * Math.cos(angle)
    const py = hexagon.y + hexagon.size * Math.sin(angle)
    if (i === 0) {
      ctx.moveTo(px, py)
    } else {
      ctx.lineTo(px, py)
    }
  }
  ctx.closePath()
  ctx.stroke()
}
