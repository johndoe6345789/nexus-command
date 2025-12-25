import { Card, CardContent, Stack, Typography, Button, TextField, Grid, Chip, Box } from '@mui/material'
import { Category, Public, Park, Terrain, Business, Shuffle, Download, PlayArrow, Refresh } from '@mui/icons-material'
import { useState, useRef, useEffect } from 'react'
import { useKV } from '@/hooks/useKV'

interface GenerationOption {
  id: string
  name: string
  icon: React.ElementType
  color: string
  description: string
}

interface MapData {
  type: string
  seed: string
  complexity: string
  timestamp: number
  preview: string
}

interface ProceduralGenPanelProps {
  isGenerating: boolean
  generationProgress: number
  onGenerationStart: (type: string, seed: string) => void
  onGenerationProgress: (progress: number) => void
  onGenerationEnd: () => void
}

const generationTypes: GenerationOption[] = [
  { id: 'arena', name: 'Arena Map', icon: Business, color: 'oklch(0.75 0.20 220)', description: 'Generate combat arena layouts' },
  { id: 'terrain', name: 'Terrain', icon: Terrain, color: '#4ade80', description: 'Generate heightmap-based landscapes' },
  { id: 'structures', name: 'Structures', icon: Business, color: 'oklch(0.75 0.20 220)', description: 'Create buildings and architecture' },
  { id: 'vegetation', name: 'Vegetation', icon: Park, color: '#22c55e', description: 'Spawn trees and plants' },
  { id: 'planets', name: 'Planets', icon: Public, color: '#8b5cf6', description: 'Generate celestial bodies' },
  { id: 'meshes', name: 'Custom Meshes', icon: Category, color: '#f59e0b', description: 'Procedural 3D geometry' },
]

export function ProceduralGenPanel({
  isGenerating,
  generationProgress,
  onGenerationStart,
  onGenerationProgress,
  onGenerationEnd
}: ProceduralGenPanelProps) {
  const [selectedType, setSelectedType] = useState<string>('arena')
  const [seed, setSeed] = useState<string>('')
  const [complexity, setComplexity] = useState<string>('medium')
  const [generationHistory, setGenerationHistory] = useKV<MapData[]>('map-generation-history', [])
  const [currentMapData, setCurrentMapData] = useState<MapData | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (currentMapData && canvasRef.current) {
      renderMap(canvasRef.current, currentMapData)
    }
  }, [currentMapData])

  const renderMap = (canvas: HTMLCanvasElement, mapData: MapData) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, width, height)

    const seedNum = parseInt(mapData.seed) || 12345
    const random = seededRandom(seedNum)

    switch (mapData.type) {
      case 'arena':
        renderArenaMap(ctx, width, height, random, mapData.complexity)
        break
      case 'terrain':
        renderTerrainMap(ctx, width, height, random, mapData.complexity)
        break
      case 'structures':
        renderStructuresMap(ctx, width, height, random, mapData.complexity)
        break
      case 'vegetation':
        renderVegetationMap(ctx, width, height, random, mapData.complexity)
        break
      case 'planets':
        renderPlanetMap(ctx, width, height, random, mapData.complexity)
        break
      case 'meshes':
        renderMeshMap(ctx, width, height, random, mapData.complexity)
        break
    }
  }

  const seededRandom = (seed: number) => {
    let value = seed
    return () => {
      value = (value * 9301 + 49297) % 233280
      return value / 233280
    }
  }

  const renderArenaMap = (ctx: CanvasRenderingContext2D, width: number, height: number, random: () => number, complexity: string) => {
    const gridSize = complexity === 'low' ? 8 : complexity === 'medium' ? 12 : complexity === 'high' ? 16 : 20
    const cellWidth = width / gridSize
    const cellHeight = height / gridSize

    ctx.strokeStyle = 'oklch(0.35 0.08 250)'
    ctx.lineWidth = 1
    for (let x = 0; x <= gridSize; x++) {
      ctx.beginPath()
      ctx.moveTo(x * cellWidth, 0)
      ctx.lineTo(x * cellWidth, height)
      ctx.stroke()
    }
    for (let y = 0; y <= gridSize; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * cellHeight)
      ctx.lineTo(width, y * cellHeight)
      ctx.stroke()
    }

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const val = random()
        if (val > 0.7) {
          ctx.fillStyle = 'oklch(0.45 0.15 250 / 0.8)'
          ctx.fillRect(x * cellWidth + 2, y * cellHeight + 2, cellWidth - 4, cellHeight - 4)
        } else if (val > 0.5) {
          ctx.fillStyle = 'oklch(0.55 0.12 230 / 0.4)'
          ctx.fillRect(x * cellWidth + 2, y * cellHeight + 2, cellWidth - 4, cellHeight - 4)
        }
      }
    }

    const spawnPoints = complexity === 'low' ? 4 : complexity === 'medium' ? 6 : complexity === 'high' ? 8 : 10
    ctx.fillStyle = 'oklch(0.75 0.25 150)'
    for (let i = 0; i < spawnPoints; i++) {
      const x = random() * (width - 20) + 10
      const y = random() * (height - 20) + 10
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const renderTerrainMap = (ctx: CanvasRenderingContext2D, width: number, height: number, random: () => number, complexity: string) => {
    const resolution = complexity === 'low' ? 32 : complexity === 'medium' ? 64 : complexity === 'high' ? 96 : 128
    const noise: number[][] = []
    
    for (let x = 0; x < resolution; x++) {
      noise[x] = []
      for (let y = 0; y < resolution; y++) {
        noise[x][y] = random()
      }
    }

    const cellWidth = width / resolution
    const cellHeight = height / resolution

    for (let x = 0; x < resolution; x++) {
      for (let y = 0; y < resolution; y++) {
        const val = noise[x][y]
        const lightness = 0.2 + val * 0.5
        ctx.fillStyle = `oklch(${lightness} 0.08 120)`
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth + 1, cellHeight + 1)
      }
    }
  }

  const renderStructuresMap = (ctx: CanvasRenderingContext2D, width: number, height: number, random: () => number, complexity: string) => {
    const numBuildings = complexity === 'low' ? 5 : complexity === 'medium' ? 10 : complexity === 'high' ? 15 : 20

    ctx.fillStyle = 'oklch(0.25 0.03 250)'
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < numBuildings; i++) {
      const bw = 20 + random() * 60
      const bh = 20 + random() * 60
      const x = random() * (width - bw)
      const y = random() * (height - bh)
      
      ctx.fillStyle = `oklch(0.4 0.08 ${220 + random() * 40})`
      ctx.fillRect(x, y, bw, bh)
      
      ctx.strokeStyle = 'oklch(0.55 0.12 230)'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, bw, bh)
    }
  }

  const renderVegetationMap = (ctx: CanvasRenderingContext2D, width: number, height: number, random: () => number, complexity: string) => {
    ctx.fillStyle = 'oklch(0.25 0.06 120)'
    ctx.fillRect(0, 0, width, height)

    const numTrees = complexity === 'low' ? 30 : complexity === 'medium' ? 60 : complexity === 'high' ? 100 : 150

    for (let i = 0; i < numTrees; i++) {
      const x = random() * width
      const y = random() * height
      const size = 3 + random() * 8
      
      ctx.fillStyle = `oklch(0.45 0.15 ${120 + random() * 20})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const renderPlanetMap = (ctx: CanvasRenderingContext2D, width: number, height: number, random: () => number, complexity: string) => {
    ctx.fillStyle = 'oklch(0.05 0.01 250)'
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.35

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    const hue = random() * 360
    gradient.addColorStop(0, `oklch(0.65 0.20 ${hue})`)
    gradient.addColorStop(0.5, `oklch(0.45 0.18 ${hue + 20})`)
    gradient.addColorStop(1, `oklch(0.25 0.12 ${hue})`)
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()

    const numCraters = complexity === 'low' ? 5 : complexity === 'medium' ? 10 : complexity === 'high' ? 15 : 20
    ctx.fillStyle = 'oklch(0.15 0.05 250 / 0.4)'
    for (let i = 0; i < numCraters; i++) {
      const angle = random() * Math.PI * 2
      const dist = random() * radius * 0.8
      const x = centerX + Math.cos(angle) * dist
      const y = centerY + Math.sin(angle) * dist
      const size = 5 + random() * 15
      
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const renderMeshMap = (ctx: CanvasRenderingContext2D, width: number, height: number, random: () => number, complexity: string) => {
    ctx.fillStyle = 'oklch(0.12 0.02 250)'
    ctx.fillRect(0, 0, width, height)

    const numShapes = complexity === 'low' ? 15 : complexity === 'medium' ? 30 : complexity === 'high' ? 45 : 60

    ctx.strokeStyle = 'oklch(0.65 0.15 230)'
    ctx.lineWidth = 2

    for (let i = 0; i < numShapes; i++) {
      const vertices = 3 + Math.floor(random() * 5)
      const centerX = random() * width
      const centerY = random() * height
      const size = 10 + random() * 40
      
      ctx.beginPath()
      for (let v = 0; v <= vertices; v++) {
        const angle = (v / vertices) * Math.PI * 2
        const x = centerX + Math.cos(angle) * size
        const y = centerY + Math.sin(angle) * size
        if (v === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }
  }

  const handleGenerate = async () => {
    const actualSeed = seed || Math.floor(Math.random() * 1000000).toString()
    
    onGenerationStart(selectedType, actualSeed)
    
    const steps = 5
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 180))
      onGenerationProgress((i / steps) * 100)
    }
    
    const mapData: MapData = {
      type: selectedType,
      seed: actualSeed,
      complexity,
      timestamp: Date.now(),
      preview: ''
    }

    setCurrentMapData(mapData)
    
    setGenerationHistory([mapData, ...(generationHistory || [])].slice(0, 10))
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    onGenerationEnd()
  }

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000).toString())
  }

  const handleExport = () => {
    if (!currentMapData) {
      return
    }

    const exportData = {
      ...currentMapData,
      exportedAt: new Date().toISOString()
    }

    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
  }

  const handleRegenerate = () => {
    if (currentMapData) {
      setCurrentMapData({ ...currentMapData })
    }
  }

  const selectedOption = generationTypes.find(t => t.id === selectedType)

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Category sx={{ fontSize: 32, color: '#f59e0b' }} />
          <Typography variant="h4">Procedural Map Generation</Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
                  Generation Type
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1.5}>
                  {generationTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = selectedType === type.id
                    return (
                      <Button
                        key={type.id}
                        variant={isSelected ? 'contained' : 'outlined'}
                        onClick={() => setSelectedType(type.id)}
                        startIcon={<Icon sx={{ fontSize: 20 }} />}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          borderColor: isSelected ? type.color : 'rgba(74, 158, 255, 0.3)',
                          backgroundColor: isSelected ? `${type.color}20` : 'transparent',
                          color: isSelected ? type.color : 'text.primary',
                          '&:hover': {
                            borderColor: type.color,
                            backgroundColor: `${type.color}15`,
                          },
                        }}
                      >
                        {type.name}
                      </Button>
                    )
                  })}
                </Stack>
                {selectedOption && (
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    {selectedOption.description}
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
                  Seed Value
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    placeholder="Leave empty for random"
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    onClick={handleRandomSeed}
                    startIcon={<Shuffle sx={{ fontSize: 20 }} />}
                    sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
                  >
                    Random
                  </Button>
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
                  Complexity
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  {['low', 'medium', 'high', 'ultra'].map((level) => (
                    <Button
                      key={level}
                      variant={complexity === level ? 'contained' : 'outlined'}
                      onClick={() => setComplexity(level)}
                      size="small"
                      sx={{
                        textTransform: 'capitalize',
                        minWidth: 80,
                        fontWeight: 600,
                      }}
                    >
                      {level}
                    </Button>
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  startIcon={<PlayArrow sx={{ fontSize: 20 }} />}
                  sx={{
                    flex: 1,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
                {currentMapData && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleRegenerate}
                    startIcon={<Refresh sx={{ fontSize: 20 }} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Refresh
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleExport}
                  disabled={!currentMapData}
                  startIcon={<Download sx={{ fontSize: 20 }} />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Card sx={{ 
                backgroundColor: 'rgba(74, 158, 255, 0.05)', 
                border: '1px solid rgba(74, 158, 255, 0.2)',
                overflow: 'hidden'
              }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: '1px solid rgba(74, 158, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Map Preview
                    </Typography>
                    {currentMapData && (
                      <Chip 
                        label={`Seed: ${currentMapData.seed}`} 
                        size="small" 
                        sx={{ fontWeight: 600, fontFamily: 'monospace' }} 
                      />
                    )}
                  </Box>
                  <Box sx={{ 
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 300,
                    backgroundColor: 'oklch(0.08 0.01 250)'
                  }}>
                    {currentMapData ? (
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={300}
                        style={{
                          width: '100%',
                          height: 'auto',
                          border: '1px solid oklch(0.35 0.08 250)',
                          borderRadius: '4px'
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Generate a map to see preview
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ backgroundColor: 'rgba(74, 158, 255, 0.05)', border: '1px solid rgba(74, 158, 255, 0.2)' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                    Quick Stats
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">Current Type</Typography>
                      <Chip label={selectedOption?.name} size="small" sx={{ fontWeight: 600 }} />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">Complexity</Typography>
                      <Chip label={complexity} size="small" color="primary" sx={{ fontWeight: 600, textTransform: 'capitalize' }} />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">Seed</Typography>
                      <Chip label={seed || 'Random'} size="small" sx={{ fontWeight: 600 }} />
                    </Stack>
                  </Stack>

                  <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(74, 158, 255, 0.2)' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Generation History
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {generationHistory?.length || 0} items generated
                    </Typography>
                    {generationHistory && generationHistory.length > 0 && (
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        {generationHistory.slice(0, 3).map((item, index) => (
                          <Box 
                            key={index}
                            sx={{ 
                              p: 1.5, 
                              backgroundColor: 'rgba(74, 158, 255, 0.05)',
                              borderRadius: 1,
                              border: '1px solid rgba(74, 158, 255, 0.15)'
                            }}
                          >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                {item.type}
                              </Typography>
                              <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.7 }}>
                                {item.seed}
                              </Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
