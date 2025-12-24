import { Button, Card, CardContent, Typography, Box, Stack } from '@mui/material'
import { Play, Users, Gear, ChartBar, SignOut } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { id: 'singleplayer', label: 'Campaign', icon: Play, description: 'Single player missions' },
    { id: 'multiplayer', label: 'Multiplayer', icon: Users, description: 'Join online battles' },
    { id: 'stats', label: 'Profile', icon: ChartBar, description: 'View your stats' },
    { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure your game' },
    { id: 'exit', label: 'Exit', icon: SignOut, description: 'Close application' },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              mb: 2,
              background: 'linear-gradient(90deg, oklch(0.75 0.20 220), oklch(0.70 0.18 35), oklch(0.75 0.20 220))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow-pulse 3s ease-in-out infinite',
            }}
          >
            APEX ARENA
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              mb: 12,
            }}
          >
            Next Generation Combat
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          {menuItems.map((item, index) => (
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
              <Card
                sx={{
                  height: '160px',
                  cursor: 'pointer',
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
                onClick={() => onNavigate(item.id)}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: 'primary.main',
                      opacity: 0.15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'opacity 0.3s',
                      '.MuiCard-root:hover &': {
                        opacity: 0.25,
                      },
                    }}
                  >
                    <item.icon size={40} weight="bold" color="oklch(0.75 0.20 220)" />
                  </Box>
                  <Stack alignItems="center" spacing={0.5}>
                    <Typography variant="h5">
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 10 }}
          >
            v2.0.1 • Press any key to continue
          </Typography>
        </motion.div>
      </Box>
    </Box>
  )
}
