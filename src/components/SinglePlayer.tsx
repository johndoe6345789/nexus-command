import { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  Typography,
  Stack,
  Grid,
  CircularProgress,
} from '@mui/material'
import { ArrowLeft, Play, MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface SinglePlayerProps {
  onBack: () => void
}

type Difficulty = 'recruit' | 'veteran' | 'elite' | 'legendary'

const maps = [
  { id: 'aegis', name: 'Aegis Station', terrain: 'Space Station', players: '8-16' },
  { id: 'outpost', name: 'Outpost Zero', terrain: 'Arctic Base', players: '4-12' },
  { id: 'nexus', name: 'Nexus Core', terrain: 'Industrial', players: '12-24' },
  { id: 'meridian', name: 'Meridian City', terrain: 'Urban', players: '16-32' },
]

const difficulties = [
  { id: 'recruit' as Difficulty, label: 'Recruit', color: '#4ade80' },
  { id: 'veteran' as Difficulty, label: 'Veteran', color: '#60a5fa' },
  { id: 'elite' as Difficulty, label: 'Elite', color: '#fb923c' },
  { id: 'legendary' as Difficulty, label: 'Legendary', color: '#f87171' },
]

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('veteran')
  const [loading, setLoading] = useState(false)

  const handleStart = () => {
    if (!selectedMap) {
      toast.error('Select a map to continue')
      return
    }
    setLoading(true)
    toast.success('Initializing combat simulation...')
    setTimeout(() => {
      setLoading(false)
      toast.success('Mission started!')
    }, 2000)
  }

  return (
    <Box sx={{ minHeight: '100vh', p: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={20} weight="bold" />}
          onClick={onBack}
          sx={{ mb: 4 }}
        >
          Back to Menu
        </Button>

        <Card sx={{ 
          p: 4, 
          bgcolor: 'rgba(10, 15, 30, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(74, 158, 255, 0.2)',
        }}>
          <CardContent sx={{ p: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Typography variant="h2" sx={{ mb: 2 }}>
                Campaign
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                Select your battlefield and difficulty
              </Typography>
            </motion.div>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <MapTrifold size={32} weight="bold" color="oklch(0.75 0.20 220)" />
                <Typography variant="h4">Select Mission</Typography>
              </Stack>
              <Grid container spacing={3}>
                {maps.map((map, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={map.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedMap === map.id ? '2px solid' : '1px solid',
                          borderColor: selectedMap === map.id ? 'primary.main' : 'divider',
                          bgcolor: selectedMap === map.id ? 'primary.main' : 'background.paper',
                          backgroundImage: selectedMap === map.id 
                            ? 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.1), oklch(0.70 0.18 35 / 0.1))'
                            : 'none',
                        }}
                        onClick={() => setSelectedMap(map.id)}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              aspectRatio: '16/9',
                              background: 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.2), oklch(0.70 0.18 35 / 0.2))',
                              borderRadius: 2,
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <MapTrifold size={64} weight="duotone" style={{ opacity: 0.6 }} />
                          </Box>
                          <Typography variant="h5" sx={{ mb: 1 }}>
                            {map.name}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip label={map.terrain} size="small" />
                            <Chip label={map.players} size="small" variant="outlined" />
                          </Stack>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    Difficulty
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {difficulties.map((diff) => (
                      <Button
                        key={diff.id}
                        variant={difficulty === diff.id ? 'contained' : 'outlined'}
                        onClick={() => setDifficulty(diff.id)}
                        sx={{
                          height: '56px',
                          justifyContent: 'flex-start',
                          fontSize: '1.125rem',
                          ...(difficulty !== diff.id && {
                            color: diff.color,
                            borderColor: diff.color,
                            '&:hover': {
                              borderColor: diff.color,
                              bgcolor: `${diff.color}15`,
                            },
                          }),
                        }}
                      >
                        {diff.label}
                      </Button>
                    ))}
                  </Stack>

                  <Box sx={{ pt: 3, mb: 4, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleStart}
                      disabled={!selectedMap || loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <Play size={24} weight="fill" />}
                      sx={{ height: '64px', fontSize: '1.25rem' }}
                    >
                      {loading ? 'Loading...' : 'Start Mission'}
                    </Button>
                  </Box>

                  {selectedMap && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Stack spacing={1} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                        <Typography variant="body2">
                          <strong>Map:</strong> {maps.find(m => m.id === selectedMap)?.name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Difficulty:</strong> {difficulties.find(d => d.id === difficulty)?.label}
                        </Typography>
                        <Typography variant="body2">
                          <strong>AI Bots:</strong> Enabled
                        </Typography>
                      </Stack>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
