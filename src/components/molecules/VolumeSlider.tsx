import { Box, Slider as MuiSlider, SliderProps, Chip } from '@mui/material'
import { IconLabel } from './IconLabel'
import { Icon as PhosphorIcon } from '@phosphor-icons/react'

interface VolumeSliderProps extends Omit<SliderProps, 'onChange'> {
  label: string
  icon: PhosphorIcon
  iconWeight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  value: number
  onChange: (value: number) => void
}

export function VolumeSlider({ 
  label, 
  icon, 
  iconWeight = 'bold',
  value, 
  onChange,
  ...props 
}: VolumeSliderProps) {
  return (
    <Box 
      sx={{ 
        p: 3, 
        borderRadius: '12px',
        background: 'rgba(74, 158, 255, 0.05)',
        border: '1px solid rgba(74, 158, 255, 0.2)',
      }}
    >
      <IconLabel
        icon={icon}
        iconSize={28}
        iconWeight={iconWeight}
        iconColor="#7EC4FF"
        label={label}
        value={`${value}%`}
        showChip
        sx={{ mb: 3 }}
      />
      <MuiSlider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        max={100}
        valueLabelDisplay="auto"
        {...props}
      />
    </Box>
  )
}
