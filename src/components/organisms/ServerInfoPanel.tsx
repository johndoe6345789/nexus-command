import { Plug } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Card, CardContent, Box, Typography, Button, Divider } from '@mui/material'

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
      <Card sx={{ position: 'sticky', top: 64 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" fontFamily="heading" fontWeight="bold" mb={3}>
            Server Info
          </Typography>
          {server ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Name:</Typography>
                <Typography variant="body2" fontWeight="600">{server.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Map:</Typography>
                <Typography variant="body2" fontWeight="600">{server.map}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Mode:</Typography>
                <Typography variant="body2" fontWeight="600">{server.mode}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Region:</Typography>
                <Typography variant="body2" fontWeight="600">{server.region}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Players:</Typography>
                <Typography variant="body2" fontWeight="600">
                  {server.players}/{server.maxPlayers}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Ping:</Typography>
                <Typography variant="body2" fontWeight="600">{server.ping}ms</Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" mb={3}>
              Select a server to view details
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />
          
          <Button
            variant="contained"
            size="large"
            onClick={onJoin}
            disabled={!server}
            fullWidth
            sx={{ height: 64, fontSize: '1.125rem', fontFamily: 'heading', gap: 1 }}
          >
            <Plug size={24} weight="bold" />
            Join Server
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
