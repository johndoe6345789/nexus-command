import { Card, CardContent, Stack, Typography, Button, TextField, Grid, Chip, Box } from '@mui/material'
import { Cube, Planet, Tree, Mountains, Building, Shuffle, Download, Play } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface GenerationOption {
  id: string
  name: string
  icon: React.ElementType
  color: string
  description: string
}

const generationTypes: GenerationOption[] = [
  { id: 'terrain', name: 'Terrain', icon: Mountains, color: '#4ade80', description: 'Generate heightmap-based landscapes' },
  { id: 'structures', name: 'Structures', icon: Building, color: 'oklch(0.75 0.20 220)', description: 'Create buildings and architecture' },
  { id: 'vegetation', name: 'Vegetation', icon: Tree, color: '#22c55e', description: 'Spawn trees and plants' },
  { id: 'planets', name: 'Planets', icon: Planet, color: '#8b5cf6', description: 'Generate celestial bodies' },
  { id: 'meshes', name: 'Custom Meshes', icon: Cube, color: '#f59e0b', description: 'Procedural 3D geometry' },
]

export function ProceduralGenPanel() {
  const [selectedType, setSelectedType] = useState<string>('terrain')
  const [seed, setSeed] = useState<string>('')
  const [complexity, setComplexity] = useState<string>('medium')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    const actualSeed = seed || Math.floor(Math.random() * 1000000).toString()
    
    toast.loading(`Generating ${selectedType}...`, { id: 'gen-toast' })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success(`Generated ${selectedType} with seed: ${actualSeed}`, { id: 'gen-toast' })
    setIsGenerating(false)
  }

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000).toString())
  }

  const handleExport = () => {
    toast.success('Exported generation data to clipboard')
  }

  const selectedOption = generationTypes.find(t => t.id === selectedType)

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Cube size={32} weight="duotone" color="#f59e0b" />
          <Typography variant="h4">Procedural Generation</Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
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
                        startIcon={<Icon size={20} />}
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
                    startIcon={<Shuffle size={20} />}
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
                  startIcon={<Play size={20} weight="fill" />}
                  sx={{
                    flex: 1,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleExport}
                  startIcon={<Download size={20} />}
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

          <Grid size={{ xs: 12, md: 4 }}>
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
                    0 items generated
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
