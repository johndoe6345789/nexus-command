import { Achievement } from '@/types'
import { AchievementBadge } from '@/components/atoms/AchievementBadge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { 
  Crosshair,
  Fire,
  Lightning,
  Skull,
  Target,
  Medal,
  Rocket,
  Globe,
  Crown,
  ArrowUp,
  LockKey,
} from '@phosphor-icons/react'

interface AchievementCardProps {
  achievement: Achievement
  className?: string
}

const iconMap: Record<string, React.ComponentType<any>> = {
  crosshair: Crosshair,
  fire: Fire,
  lightning: Lightning,
  skull: Skull,
  target: Target,
  medal: Medal,
  rocket: Rocket,
  globe: Globe,
  crown: Crown,
  'arrow-up': ArrowUp,
}

export function AchievementCard({ achievement, className }: AchievementCardProps) {
  const IconComponent = iconMap[achievement.icon] || Medal
  const isUnlocked = achievement.unlockedAt !== undefined
  const progress = achievement.progress ?? 0
  const maxProgress = achievement.maxProgress ?? 1
  const progressPercent = (progress / maxProgress) * 100

  const rarityGlow = {
    common: 'shadow-[0_0_20px_oklch(0.55_0.08_200/0.3)]',
    rare: 'shadow-[0_0_20px_oklch(0.45_0.15_240/0.4)]',
    epic: 'shadow-[0_0_20px_oklch(0.45_0.18_290/0.5)]',
    legendary: 'shadow-[0_0_30px_oklch(0.50_0.20_45/0.6)]',
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border transition-all duration-300',
        'bg-[oklch(0.15_0.02_250)]',
        isUnlocked
          ? `border-[oklch(0.40_0.10_250)] hover:border-[oklch(0.55_0.12_230)] ${rarityGlow[achievement.rarity]}`
          : 'border-[oklch(0.25_0.04_250)] opacity-60',
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
              'bg-gradient-to-br transition-all duration-300',
              isUnlocked
                ? 'from-[oklch(0.35_0.08_250)] to-[oklch(0.25_0.06_250)]'
                : 'from-[oklch(0.20_0.03_250)] to-[oklch(0.15_0.02_250)]'
            )}
          >
            {isUnlocked ? (
              <IconComponent size={24} weight="duotone" className="text-[oklch(0.75_0.12_230)]" />
            ) : (
              <LockKey size={24} weight="duotone" className="text-[oklch(0.40_0.05_250)]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-heading font-bold text-sm text-[oklch(0.98_0.01_250)]">
                {achievement.hidden && !isUnlocked ? '???' : achievement.name}
              </h3>
              <AchievementBadge rarity={achievement.rarity} />
            </div>

            <p className="text-xs text-[oklch(0.70_0.03_250)] leading-relaxed">
              {achievement.hidden && !isUnlocked
                ? 'Hidden achievement'
                : achievement.description}
            </p>

            {achievement.reward && isUnlocked && (
              <div className="mt-2 text-[10px] text-[oklch(0.75_0.10_45)] font-semibold">
                Reward: {achievement.reward}
              </div>
            )}

            {maxProgress > 1 && !isUnlocked && (
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[10px] text-[oklch(0.65_0.05_250)]">
                  <span>Progress</span>
                  <span>{progress}/{maxProgress}</span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </div>
            )}

            {isUnlocked && achievement.unlockedAt && (
              <div className="mt-2 text-[10px] text-[oklch(0.55_0.05_250)]">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
