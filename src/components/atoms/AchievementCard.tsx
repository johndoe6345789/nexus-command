import { Achievement } from '@/types'
import { AchievementBadge } from '@/components/atoms/AchievementBadge'
import { Box, Typography, LinearProgress, Paper } from '@mui/material'
import { 
  GpsFixed,
  Whatshot,
  FlashOn,
  Dangerous,
  MyLocation,
  EmojiEvents,
  Rocket,
  Public,
  EmojiEventsOutlined,
  TrendingUp,
  Lock,
} from '@mui/icons-material'

interface AchievementCardProps {
  achievement: Achievement
  className?: string
}

const iconMap: Record<string, React.ComponentType<any>> = {
  crosshair: GpsFixed,
  fire: Whatshot,
  lightning: FlashOn,
  skull: Dangerous,
  target: MyLocation,
  medal: EmojiEvents,
  rocket: Rocket,
  globe: Public,
  crown: EmojiEventsOutlined,
  'arrow-up': TrendingUp,
}

const rarityGlow = {
  common: '0 0 20px oklch(0.55 0.08 200 / 0.3)',
  rare: '0 0 20px oklch(0.45 0.15 240 / 0.4)',
  epic: '0 0 20px oklch(0.45 0.18 290 / 0.5)',
  legendary: '0 0 30px oklch(0.50 0.20 45 / 0.6)',
}

export function AchievementCard({ achievement, className }: AchievementCardProps) {
  const IconComponent = iconMap[achievement.icon] || EmojiEvents
  const isUnlocked = achievement.unlockedAt !== undefined
  const progress = achievement.progress ?? 0
  const maxProgress = achievement.maxProgress ?? 1
  const progressPercent = (progress / maxProgress) * 100

  return (
    <Paper
      elevation={0}
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        border: '1px solid',
        borderColor: isUnlocked ? 'oklch(0.65 0.14 230)' : 'oklch(0.45 0.08 250)',
        bgcolor: isUnlocked ? 'oklch(0.32 0.05 250)' : 'oklch(0.25 0.04 250)',
        opacity: isUnlocked ? 1 : 0.8,
        boxShadow: isUnlocked ? rarityGlow[achievement.rarity] : 'none',
        transition: 'all 0.3s ease',
        width: '100%',
        '&:hover': isUnlocked ? {
          borderColor: 'oklch(0.75 0.16 230)',
          bgcolor: 'oklch(0.35 0.06 250)',
        } : {},
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
          <Box
            sx={{
              flexShrink: 0,
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isUnlocked
                ? 'linear-gradient(135deg, oklch(0.55 0.12 250), oklch(0.45 0.10 250))'
                : 'linear-gradient(135deg, oklch(0.35 0.06 250), oklch(0.28 0.05 250))',
              transition: 'all 0.3s ease',
            }}
          >
            {isUnlocked ? (
              <IconComponent 
                sx={{ fontSize: 24, color: 'oklch(0.95 0.14 230)' }} 
                titleAccess={achievement.name}
              />
            ) : (
              <Lock 
                sx={{ fontSize: 24, color: 'oklch(0.65 0.08 250)' }} 
                titleAccess="Locked achievement"
              />
            )}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'oklch(0.98 0.01 250)',
                  fontSize: '14px',
                }}
              >
                {achievement.hidden && !isUnlocked ? '???' : achievement.name}
              </Typography>
              <AchievementBadge rarity={achievement.rarity} />
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '12px',
                color: 'oklch(0.88 0.05 250)',
                lineHeight: 1.6,
              }}
            >
              {achievement.hidden && !isUnlocked
                ? 'Hidden achievement'
                : achievement.description}
            </Typography>

            {achievement.reward && isUnlocked && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  mt: 1,
                  fontSize: '10px',
                  color: 'oklch(0.90 0.14 45)',
                  fontWeight: 600,
                }}
              >
                Reward: {achievement.reward}
              </Typography>
            )}

            {maxProgress > 1 && !isUnlocked && (
              <Box sx={{ mt: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontSize: '10px', color: 'oklch(0.85 0.07 250)' }}>
                    Progress
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: 'oklch(0.85 0.07 250)' }}>
                    {progress}/{maxProgress}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progressPercent}
                  sx={{ 
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'oklch(0.40 0.07 250)',
                  }}
                />
              </Box>
            )}

            {isUnlocked && achievement.unlockedAt && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  mt: 1,
                  fontSize: '10px',
                  color: 'oklch(0.78 0.08 250)',
                }}
              >
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
