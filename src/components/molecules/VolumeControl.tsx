import { Box, Stack, Typography, Slider, Chip } from '@mui/material'
import { SpeakerHigh } from '@phosphor-icons/react'

interface VolumeControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  iconWeight?: 'bold' | 'duotone' | 'fill'
}

export function VolumeControl({ label, value, onChange, iconWeight = 'bold' }: VolumeControlProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: '12px',
        background: 'rgba(74, 158, 255, 0.05)',
        border: '1px solid rgba(74, 158, 255, 0.2)',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#7EC4FF',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <SpeakerHigh size={28} weight={iconWeight} />
          {label}
        </Typography>
        <Chip label={`${value}%`} color="primary" />
      </Stack>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        max={100}
        valueLabelDisplay="auto"
      />
    </Box>
  )
}
