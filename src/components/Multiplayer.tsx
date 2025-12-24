import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  Box,
  Typography,
  Stack,
  IconButton,
  LinearProgress,
} from '@mui/material'
import { ArrowLeft, ArrowsClockwise, Plug, Users, WifiHigh } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface MultiplayerProps {
  onBack: () => void
}

interface Server {
  id: string
  name: string
  map: string
  players: number
  maxPlayers: number
  ping: number
  mode: string
  region: string
}

export function Multiplayer({ onBack }: MultiplayerProps) {
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const generateServers = () => {
    const serverNames = [
      'Alpha Squad HQ',
      'Bravo Battalion',
      'Delta Force Arena',
      'Echo Combat Zone',
      'Foxtrot Stronghold',
      'Ghost Division',
    ]
    
    const maps = ['Aegis Station', 'Outpost Zero', 'Nexus Core', 'Meridian City']
    const modes = ['Team Deathmatch', 'Capture the Flag', 'Domination']
    const regions = ['US East', 'US West', 'EU', 'Asia']

    return serverNames.map((name, i) => ({
      id: `server-${i}`,
      name,
      map: maps[Math.floor(Math.random() * maps.length)],
      players: Math.floor(Math.random() * 20) + 5,
      maxPlayers: 24,
      ping: Math.floor(Math.random() * 80) + 20,
      mode: modes[Math.floor(Math.random() * modes.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
    }))
  }

  useEffect(() => {
    setServers(generateServers())
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    toast.info('Refreshing server list...')
    setTimeout(() => {
      setServers(generateServers())
      setLoading(false)
      toast.success('Servers updated')
    }, 1000)
  }

  const handleJoin = () => {
    if (!selectedServer) {
      toast.error('Select a server to join')
      return
    }
    toast.success('Connecting to server...')
    setTimeout(() => {
      toast.success('Connection established!')
    }, 1500)
  }

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.map.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 6 }}>
                <Box>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    Multiplayer
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Join active battles worldwide
                  </Typography>
                </Box>
                <IconButton
                  size="large"
                  onClick={handleRefresh}
                  disabled={loading}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    width: 56,
                    height: 56,
                  }}
                >
                  <ArrowsClockwise
                    size={28}
                    weight="bold"
                    className={loading ? 'animate-spin' : ''}
                  />
                </IconButton>
              </Stack>
            </motion.div>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TextField
                placeholder="Search servers or maps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Stack spacing={2} sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
                {filteredServers.map((server, index) => (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedServer === server.id ? '2px solid' : '1px solid',
                        borderColor: selectedServer === server.id ? 'primary.main' : 'divider',
                        bgcolor: 'background.paper',
                        backgroundImage: selectedServer === server.id 
                          ? 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.05), oklch(0.70 0.18 35 / 0.05))'
                          : 'none',
                        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      onClick={() => setSelectedServer(server.id)}
                    >
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box sx={{ flex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                              <Typography variant="h6">{server.name}</Typography>
                              <Chip
                                icon={<WifiHigh size={14} weight="bold" />}
                                label={`${server.ping}ms`}
                                size="small"
                                color={server.ping < 50 ? 'primary' : 'default'}
                              />
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                              <Typography variant="body2">{server.map}</Typography>
                              <Typography variant="body2">•</Typography>
                              <Typography variant="body2">{server.mode}</Typography>
                              <Typography variant="body2">•</Typography>
                              <Chip label={server.region} size="small" variant="outlined" />
                            </Stack>
                          </Box>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                            <Users size={24} weight="bold" />
                            <Typography variant="h6">
                              {server.players}/{server.maxPlayers}
                            </Typography>
                          </Stack>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={(server.players / server.maxPlayers) * 100}
                          sx={{ mt: 2, height: 6, borderRadius: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Box>

          <Box sx={{ flex: 1, minWidth: 300 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card sx={{ position: 'sticky', top: 32 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    Server Info
                  </Typography>
                  {selectedServer ? (
                    <Stack spacing={2} sx={{ mb: 4 }}>
                      {(() => {
                        const server = servers.find((s) => s.id === selectedServer)
                        return server ? (
                          <>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography color="text.secondary">Name:</Typography>
                              <Typography fontWeight="bold">{server.name}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography color="text.secondary">Map:</Typography>
                              <Typography fontWeight="bold">{server.map}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography color="text.secondary">Mode:</Typography>
                              <Typography fontWeight="bold">{server.mode}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography color="text.secondary">Region:</Typography>
                              <Typography fontWeight="bold">{server.region}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography color="text.secondary">Players:</Typography>
                              <Typography fontWeight="bold">
                                {server.players}/{server.maxPlayers}
                              </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography color="text.secondary">Ping:</Typography>
                              <Typography fontWeight="bold">{server.ping}ms</Typography>
                            </Stack>
                          </>
                        ) : null
                      })()}
                    </Stack>
                  ) : (
                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                      Select a server to view details
                    </Typography>
                  )}

                  <Box sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleJoin}
                      disabled={!selectedServer}
                      startIcon={<Plug size={24} weight="bold" />}
                      sx={{ height: '64px', fontSize: '1.25rem' }}
                    >
                      Join Server
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
