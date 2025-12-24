import { Button, Card, CardContent, Typography, Box, Stack } from '@mui/material'
import { Play, Users, Gear, ChartBar, SignOut, Code } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { id: 'singleplayer', label: 'Campaign', icon: Play, description: 'Single player missions' },
    { id: 'multiplayer', label: 'Multiplayer', icon: Users, description: 'Join online battles' },
    { id: 'stats', label: 'Profile', icon: ChartBar, description: 'View your stats' },
    { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure your game' },
    { id: 'developer', label: 'Developer', icon: Code, description: 'Debug tools & cheats' },
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 10,
          }}
        >
          <Logo size={100} showText={true} animate={true} />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'text.secondary',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mt: 3,
              }}
            >
              Next Generation Combat
            </Typography>
          </motion.div>
        </Box>

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
                    background: 'linear-gradient(90deg, transparent, oklch(0.55 0.12 230 / 0.08), transparent)',
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
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, oklch(0.55 0.12 230 / 0.15), transparent 70%)',
                        filter: 'blur(8px)',
                        transition: 'all 0.3s ease',
                        '.MuiCard-root:hover &': {
                          width: '80px',
                          height: '80px',
                          background: 'radial-gradient(circle, oklch(0.55 0.12 230 / 0.25), transparent 70%)',
                        },
                      }}
                    />
                    <item.icon 
                      size={48} 
                      weight="duotone" 
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        color: 'oklch(0.65 0.12 230)',
                        filter: 'drop-shadow(0 0 6px oklch(0.55 0.12 230 / 0.3))',
                        transition: 'all 0.3s ease',
                      }}
                    />
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
