import { Grid, Box } from '@mui/material'
import { GlassCard } from '../molecules'
import { Text, Icon } from '../atoms'
import { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Stack } from '@mui/material'
import { GlowBox } from '../atoms'

interface MenuItem {
  id: string
  label: string
  icon: PhosphorIcon
  description: string
}

interface MenuGridProps {
  items: MenuItem[]
  onNavigate: (id: string) => void
}

export function MenuGrid({ items, onNavigate }: MenuGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3,
        maxWidth: '900px',
        mx: 'auto',
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <GlassCard
            onClick={() => onNavigate(item.id)}
            sx={{ 
              height: '160px',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, oklch(0.75 0.20 220 / 0.1), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.7s',
              },
              '&:hover::before': {
                transform: 'translateX(100%)',
              },
            }}
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ height: '100%' }}
            >
              <GlowBox>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon 
                    icon={item.icon}
                    size={48} 
                    weight="duotone" 
                    style={{
                      color: 'oklch(0.75 0.20 220)',
                      filter: 'drop-shadow(0 0 8px oklch(0.75 0.20 220 / 0.5))',
                    }}
                  />
                </Box>
              </GlowBox>
              <Stack alignItems="center" spacing={0.5}>
                <Text variant="h5">
                  {item.label}
                </Text>
                <Text variant="body2" color="text.secondary">
                  {item.description}
                </Text>
              </Stack>
            </Stack>
          </GlassCard>
        </motion.div>
      ))}
    </Box>
  )
}
