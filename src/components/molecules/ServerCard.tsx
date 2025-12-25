import { Users, WifiHigh } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Card, CardContent, Box, Typography, Chip, LinearProgress } from '@mui/material'

interface ServerCardProps {
  id: string
  name: string
  map: string
  mode: string
  region: string
  players: number
  maxPlayers: number
  ping: number
  selected: boolean
  onSelect: (id: string) => void
  delay?: number
}

export function ServerCard({
  id,
  name,
  map,
  mode,
  region,
  players,
  maxPlayers,
  ping,
  selected,
  onSelect,
  delay = 0,
}: ServerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s',
          border: selected ? 2 : 1,
          borderColor: selected ? 'primary.main' : 'divider',
          background: selected 
            ? 'linear-gradient(135deg, rgba(100, 150, 255, 0.05), rgba(255, 150, 100, 0.05))' 
            : 'background.paper',
          '&:hover': {
            boxShadow: 6,
            borderColor: 'primary.light',
          }
        }}
        onClick={() => onSelect(id)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Typography variant="subtitle1" fontFamily="heading" fontWeight="bold" noWrap>
                  {name}
                </Typography>
                <Chip 
                  size="small"
                  color={ping < 50 ? 'success' : 'default'}
                  icon={<WifiHigh size={14} weight="bold" />}
                  label={`${ping}ms`}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary">{map}</Typography>
                <Typography variant="body2" color="text.secondary">•</Typography>
                <Typography variant="body2" color="text.secondary">{mode}</Typography>
                <Typography variant="body2" color="text.secondary">•</Typography>
                <Chip label={region} size="small" variant="outlined" />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Users size={24} weight="bold" />
              <Typography variant="h6" fontFamily="heading" fontWeight="bold">
                {players}/{maxPlayers}
              </Typography>
            </Box>
          </Box>
          <LinearProgress 
            variant="determinate"
            value={(players / maxPlayers) * 100}
            sx={{ mt: 1.5, height: 8, borderRadius: 1 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
