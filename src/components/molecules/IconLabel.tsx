import { Stack, StackProps, Chip } from '@mui/material'
import { Text } from '../atoms'
import { SvgIconComponent } from '@mui/icons-material'

interface IconLabelProps extends Omit<StackProps, 'children'> {
  icon: SvgIconComponent
  iconSize?: number
  iconColor?: string
  label: string
  value?: string | number
  showChip?: boolean
}

export function IconLabel({ 
  icon: IconComponent, 
  iconSize = 24,
  iconColor = 'oklch(0.75 0.20 220)',
  label,
  value,
  showChip = false,
  ...props 
}: IconLabelProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...props}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconComponent sx={{ fontSize: iconSize, color: iconColor }} />
        <Text variant="h5" sx={{ color: iconColor }}>
          {label}
        </Text>
      </Stack>
      {value !== undefined && (
        showChip ? (
          <Chip label={value} color="primary" />
        ) : (
          <Text variant="body1">{value}</Text>
        )
      )}
    </Stack>
  )
}
