import {
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  Typography,
  Stack,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { 
  ArrowLeft, 
  Code, 
  Terminal, 
  Bug, 
  Lightning, 
  Database,
  ChartLine,
  Gear,
  Eye
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { useState } from 'react'

interface DeveloperProps {
  onBack: () => void
}

export function Developer({ onBack }: DeveloperProps) {
  const [debugMode, setDebugMode] = useKV<boolean>('debug-mode', false)
  const [showFPS, setShowFPS] = useKV<boolean>('show-fps', false)
  const [showHitboxes, setShowHitboxes] = useKV<boolean>('show-hitboxes', false)
  const [godMode, setGodMode] = useKV<boolean>('god-mode', false)
  const [unlimitedAmmo, setUnlimitedAmmo] = useKV<boolean>('unlimited-ammo', false)
  const [noclip, setNoclip] = useKV<boolean>('noclip', false)
  const [consoleInput, setConsoleInput] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '> System initialized',
    '> Nexus Command v2.0.1 - Developer Console',
    '> Type "help" for available commands',
  ])

  const systemStats = {
    fps: 144,
    ping: 23,
    memoryUsage: '2.4 GB',
    drawCalls: 1247,
    triangles: '1.2M',
    shaders: 47,
    textures: 189,
    uptime: '02:34:12',
  }

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consoleInput.trim()) return

    const newOutput = [...consoleOutput, `> ${consoleInput}`]
    
    const command = consoleInput.toLowerCase().trim()
    if (command === 'help') {
      newOutput.push('Available commands:')
      newOutput.push('  help - Show this help message')
      newOutput.push('  clear - Clear console output')
      newOutput.push('  stats - Show detailed system statistics')
      newOutput.push('  kill [entity] - Destroy target entity')
      newOutput.push('  spawn [type] - Spawn entity of type')
      newOutput.push('  tp [x] [y] [z] - Teleport to coordinates')
    } else if (command === 'clear') {
      setConsoleOutput(['> Console cleared'])
      setConsoleInput('')
      return
    } else if (command === 'stats') {
      newOutput.push('System Statistics:')
      newOutput.push(`  FPS: ${systemStats.fps}`)
      newOutput.push(`  Memory: ${systemStats.memoryUsage}`)
      newOutput.push(`  Draw Calls: ${systemStats.drawCalls}`)
      newOutput.push(`  Triangles: ${systemStats.triangles}`)
    } else {
      newOutput.push(`Unknown command: "${consoleInput}"`)
      newOutput.push('Type "help" for available commands')
    }

    setConsoleOutput(newOutput.slice(-20))
    setConsoleInput('')
  }

  return (
    <Box sx={{ minHeight: '100vh', p: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={20} weight="bold" />}
            onClick={onBack}
            sx={{ mb: 4 }}
          >
            Back to Menu
          </Button>

          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 6 }}>
            <Box>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Developer Tools
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Advanced debugging and testing utilities
              </Typography>
            </Box>
            <Code size={80} weight="duotone" color="oklch(0.75 0.20 220)" />
          </Stack>
        </motion.div>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        opacity: 0.2,
                      }}
                    >
                      <ChartLine size={40} weight="bold" color="oklch(0.75 0.20 220)" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        FPS
                      </Typography>
                      <Typography variant="h3" fontWeight="black">
                        {systemStats.fps}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#4ade80',
                        opacity: 0.2,
                      }}
                    >
                      <Lightning size={40} weight="bold" color="#4ade80" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Ping
                      </Typography>
                      <Typography variant="h3" fontWeight="black">
                        {systemStats.ping}ms
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#fbbf24',
                        opacity: 0.2,
                      }}
                    >
                      <Database size={40} weight="bold" color="#fbbf24" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Memory
                      </Typography>
                      <Typography variant="h5" fontWeight="black">
                        {systemStats.memoryUsage}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#8b5cf6',
                        opacity: 0.2,
                      }}
                    >
                      <Bug size={40} weight="bold" color="#8b5cf6" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Draw Calls
                      </Typography>
                      <Typography variant="h5" fontWeight="black">
                        {systemStats.drawCalls}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Gear size={32} weight="duotone" color="oklch(0.75 0.20 220)" />
                    <Typography variant="h4">
                      Debug Options
                    </Typography>
                  </Stack>
                  
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={debugMode}
                          onChange={(e) => setDebugMode(e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="h6">Debug Mode</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Enable verbose logging and debug overlays
                          </Typography>
                        </Box>
                      }
                      labelPlacement="start"
                      sx={{ justifyContent: 'space-between', ml: 0 }}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={showFPS}
                          onChange={(e) => setShowFPS(e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="h6">Show FPS Counter</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Display real-time frame rate information
                          </Typography>
                        </Box>
                      }
                      labelPlacement="start"
                      sx={{ justifyContent: 'space-between', ml: 0 }}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={showHitboxes}
                          onChange={(e) => setShowHitboxes(e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="h6">Show Hitboxes</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Render collision boundaries for all entities
                          </Typography>
                        </Box>
                      }
                      labelPlacement="start"
                      sx={{ justifyContent: 'space-between', ml: 0 }}
                    />
                  </Stack>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card sx={{ mt: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                      <Lightning size={32} weight="duotone" color="#fbbf24" />
                      <Typography variant="h4">
                        Cheat Codes
                      </Typography>
                    </Stack>
                    
                    <Stack spacing={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={godMode}
                            onChange={(e) => setGodMode(e.target.checked)}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="h6">God Mode</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Become invincible to all damage
                            </Typography>
                          </Box>
                        }
                        labelPlacement="start"
                        sx={{ justifyContent: 'space-between', ml: 0 }}
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={unlimitedAmmo}
                            onChange={(e) => setUnlimitedAmmo(e.target.checked)}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="h6">Unlimited Ammo</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Never run out of ammunition
                            </Typography>
                          </Box>
                        }
                        labelPlacement="start"
                        sx={{ justifyContent: 'space-between', ml: 0 }}
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={noclip}
                            onChange={(e) => setNoclip(e.target.checked)}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="h6">No Clip</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Fly through walls and terrain
                            </Typography>
                          </Box>
                        }
                        labelPlacement="start"
                        sx={{ justifyContent: 'space-between', ml: 0 }}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Terminal size={32} weight="duotone" color="oklch(0.75 0.20 220)" />
                    <Typography variant="h4">
                      Console
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: 2,
                      p: 3,
                      mb: 2,
                      height: '400px',
                      overflowY: 'auto',
                      fontFamily: 'monospace',
                      border: '1px solid rgba(74, 158, 255, 0.3)',
                    }}
                  >
                    {consoleOutput.map((line, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          color: line.startsWith('>') 
                            ? 'oklch(0.75 0.20 220)' 
                            : 'oklch(0.85 0.05 220)',
                          fontFamily: 'monospace',
                          mb: 0.5,
                        }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>

                  <form onSubmit={handleConsoleSubmit}>
                    <TextField
                      fullWidth
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="Enter command..."
                      variant="outlined"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <Typography sx={{ mr: 1, color: 'oklch(0.75 0.20 220)' }}>
                              &gt;
                            </Typography>
                          ),
                          sx: {
                            fontFamily: 'monospace',
                          },
                        },
                      }}
                    />
                  </form>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card sx={{ mt: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                      <Eye size={32} weight="duotone" color="#4ade80" />
                      <Typography variant="h4">
                        Render Stats
                      </Typography>
                    </Stack>

                    <Stack spacing={3}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography color="text.secondary">Triangles</Typography>
                        <Chip label={systemStats.triangles} color="primary" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography color="text.secondary">Active Shaders</Typography>
                        <Chip label={systemStats.shaders} color="primary" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography color="text.secondary">Loaded Textures</Typography>
                        <Chip label={systemStats.textures} color="primary" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography color="text.secondary">Session Uptime</Typography>
                        <Chip label={systemStats.uptime} color="primary" />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
