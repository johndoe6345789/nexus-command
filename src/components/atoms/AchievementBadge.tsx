import { Badge } from '@/components/ui/badge'
import { AchievementRarity } from '@/types'
import { cn } from '@/lib/utils'

interface AchievementBadgeProps {
  rarity: AchievementRarity
  className?: string
}

export function AchievementBadge({ rarity, className }: AchievementBadgeProps) {
  const rarityConfig = {
    common: {
      label: 'Common',
      className: 'bg-[oklch(0.55_0.08_200)] text-[oklch(0.95_0.01_200)] border-[oklch(0.65_0.1_200)]',
    },
    rare: {
      label: 'Rare',
      className: 'bg-[oklch(0.45_0.15_240)] text-[oklch(0.95_0.01_240)] border-[oklch(0.55_0.18_240)]',
    },
    epic: {
      label: 'Epic',
      className: 'bg-[oklch(0.45_0.18_290)] text-[oklch(0.95_0.01_290)] border-[oklch(0.55_0.22_290)]',
    },
    legendary: {
      label: 'Legendary',
      className: 'bg-[oklch(0.50_0.20_45)] text-[oklch(0.98_0.01_45)] border-[oklch(0.60_0.25_45)]',
    },
  }

  const config = rarityConfig[rarity]

  return (
    <Badge
      className={cn(
        'text-xs font-bold uppercase tracking-wider border',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
