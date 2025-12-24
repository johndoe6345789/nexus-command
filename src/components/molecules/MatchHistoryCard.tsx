import { Box, Stack, Typography, Chip } from '@mui/material'

interface MatchHistoryCardProps {
  map: string
  mode: string
  result: 'Victory' | 'Defeat'
  score: string
  date: string
}

export function MatchHistoryCard({ map, mode, result, score, date }: MatchHistoryCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'secondary.main',
        opacity: 0.5,
        '&:hover': {
          opacity: 0.7,
        },
        transition: 'opacity 0.3s',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {map}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
            <Chip label={mode} size="small" variant="outlined" />
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Chip
            label={result}
            color={result === 'Victory' ? 'primary' : 'error'}
            sx={{ mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {score}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
