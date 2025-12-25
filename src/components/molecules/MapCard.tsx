import { MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Card, CardContent, Box, Typography, Chip } from '@mui/material'

interface MapCardProps {
  id: string
  name: string
  terrain: string
  players: string
  selected: boolean
  onSelect: (id: string) => void
  delay?: number
}

export function MapCard({ id, name, terrain, players, selected, onSelect, delay = 0 }: MapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
          <Box sx={{ 
            aspectRatio: '16/9', 
            background: 'linear-gradient(135deg, rgba(100, 150, 255, 0.2), rgba(255, 150, 100, 0.2))',
            borderRadius: 2,
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MapTrifold size={64} weight="duotone" style={{ opacity: 0.6 }} />
          </Box>
          <Typography variant="h6" fontFamily="heading" fontWeight="bold" mb={1}>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={terrain} size="small" />
            <Chip label={players} size="small" variant="outlined" />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}
