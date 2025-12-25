import { Box, Typography, Chip } from '@mui/material'

interface MatchHistoryCardProps {
  map: string
  mode: string
  result: 'Victory' | 'Defeat'
  score: string
  date: string
}

export function MatchHistoryCard({ map, mode, result, score, date }: MatchHistoryCardProps) {
  return (
    <Box sx={{ 
      p: 1.5, 
      borderRadius: 2, 
      bgcolor: 'action.hover',
      transition: 'all 0.3s',
      '&:hover': { bgcolor: 'action.selected' }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle1" fontFamily="heading" fontWeight="bold" mb={0.5}>
            {map}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={mode} size="small" variant="outlined" />
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Chip 
            label={result}
            color={result === 'Victory' ? 'success' : 'error'}
            size="small"
            sx={{ mb: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {score}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
