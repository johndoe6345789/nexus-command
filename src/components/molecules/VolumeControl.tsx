import { SpeakerHigh } from '@phosphor-icons/react'
import { Box, Slider, Chip } from '@mui/material'

interface VolumeControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  iconWeight?: 'bold' | 'duotone' | 'fill'
}

export function VolumeControl({ label, value, onChange, iconWeight = 'bold' }: VolumeControlProps) {
  return (
    <Box sx={{ 
      p: 2, 
      borderRadius: 3, 
      bgcolor: 'rgba(100, 150, 255, 0.05)', 
      border: '1px solid rgba(100, 150, 255, 0.2)' 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
          <SpeakerHigh size={28} weight={iconWeight} />
          <Box component="h5" sx={{ fontFamily: 'heading', fontSize: '1.125rem', fontWeight: 600, m: 0 }}>
            {label}
          </Box>
        </Box>
        <Chip label={`${value}%`} size="small" sx={{ fontWeight: 'bold' }} />
      </Box>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        max={100}
        step={1}
      />
    </Box>
  )
}
