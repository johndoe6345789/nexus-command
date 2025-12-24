import { Stack, StackProps, Chip } from '@mui/material'
import { Text, Icon } from '../atoms'
import { Icon as PhosphorIcon } from '@phosphor-icons/react'

interface IconLabelProps extends Omit<StackProps, 'children'> {
  icon: PhosphorIcon
  iconSize?: number
  iconWeight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  iconColor?: string
  label: string
  value?: string | number
  showChip?: boolean
}

export function IconLabel({ 
  icon, 
  iconSize = 24,
  iconWeight = 'bold',
  iconColor = 'oklch(0.75 0.20 220)',
  label,
  value,
  showChip = false,
  ...props 
}: IconLabelProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...props}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Icon icon={icon} size={iconSize} weight={iconWeight} style={{ color: iconColor }} />
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
