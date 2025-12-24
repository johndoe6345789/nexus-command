import { Card, CardContent, Typography, Stack, Box, Button } from '@mui/material'
import { Plug } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface Server {
  id: string
  name: string
  map: string
  mode: string
  region: string
  players: number
  maxPlayers: number
  ping: number
}

interface ServerInfoPanelProps {
  server: Server | undefined
  onJoin: () => void
}

export function ServerInfoPanel({ server, onJoin }: ServerInfoPanelProps) {
  return (
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
          {server ? (
            <Stack spacing={2} sx={{ mb: 4 }}>
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
              onClick={onJoin}
              disabled={!server}
              startIcon={<Plug size={24} weight="bold" />}
              sx={{ height: '64px', fontSize: '1.25rem' }}
            >
              Join Server
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}
