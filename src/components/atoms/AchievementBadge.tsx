import { Chip } from '@mui/material'
import { AchievementRarity } from '@/types'

interface AchievementBadgeProps {
  rarity: AchievementRarity
  className?: string
}

export function AchievementBadge({ rarity, className }: AchievementBadgeProps) {
  const rarityConfig = {
    common: {
      label: 'Common',
      bgcolor: 'oklch(0.55 0.08 200)',
      color: 'oklch(0.95 0.01 200)',
      borderColor: 'oklch(0.65 0.1 200)',
    },
    rare: {
      label: 'Rare',
      bgcolor: 'oklch(0.45 0.15 240)',
      color: 'oklch(0.95 0.01 240)',
      borderColor: 'oklch(0.55 0.18 240)',
    },
    epic: {
      label: 'Epic',
      bgcolor: 'oklch(0.45 0.18 290)',
      color: 'oklch(0.95 0.01 290)',
      borderColor: 'oklch(0.55 0.22 290)',
    },
    legendary: {
      label: 'Legendary',
      bgcolor: 'oklch(0.50 0.20 45)',
      color: 'oklch(0.98 0.01 45)',
      borderColor: 'oklch(0.60 0.25 45)',
    },
  }

  const config = rarityConfig[rarity]

  return (
    <Chip
      label={config.label}
      size="small"
      className={className}
      sx={{
        bgcolor: config.bgcolor,
        color: config.color,
        borderColor: config.borderColor,
        border: '1px solid',
        fontSize: '10px',
        height: 20,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        '& .MuiChip-label': {
          px: 1,
        },
      }}
    />
  )
}
