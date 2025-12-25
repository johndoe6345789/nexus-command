import { useState, useEffect } from 'react'
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Badge, 
  Drawer, 
  Box, 
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  Button,
  Divider,
  LinearProgress,
  Chip,
  Paper,
} from '@mui/material'
import { Bell, Trophy, X } from '@phosphor-icons/react'
import { AlertItem } from '@/components/atoms/AlertItem'
import { AchievementCard } from '@/components/atoms/AchievementCard'
import { Alert, Achievement } from '@/types'
import { ACHIEVEMENT_DEFINITIONS } from '@/constants'
import { useKV } from '@github/spark/hooks'

interface TopBarProps {
  className?: string
}

interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ height: '100%' }}
    >
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  )
}

export function TopBar({ className }: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [alerts, setAlerts] = useKV<Alert[]>('game-alerts', [])
  const [achievements, setAchievements] = useKV<Achievement[]>('game-achievements', [])

  useEffect(() => {
    if (achievements && achievements.length === 0) {
      setAchievements(ACHIEVEMENT_DEFINITIONS)
    }
  }, [achievements, setAchievements])

  const unreadCount = alerts?.filter(a => !a.read).length ?? 0
  const unlockedAchievements = achievements?.filter(a => a.unlockedAt).length ?? 0
  const totalAchievements = achievements?.length ?? 0

  const handleMarkAsRead = (id: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts?.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      ) ?? []
    )
  }

  const handleDismissAlert = (id: string) => {
    setAlerts((currentAlerts) => currentAlerts?.filter(alert => alert.id !== id) ?? [])
  }

  const handleClearAll = () => {
    setAlerts((currentAlerts) => currentAlerts?.map(alert => ({ ...alert, read: true })) ?? [])
  }

  const handleDeleteAll = () => {
    setAlerts([])
  }

  const sortedAlerts = [...(alerts ?? [])].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1
    return b.timestamp - a.timestamp
  })

  const sortedAchievements = [...(achievements ?? [])].sort((a, b) => {
    if ((a.unlockedAt !== undefined) !== (b.unlockedAt !== undefined)) {
      return a.unlockedAt ? -1 : 1
    }
    if (a.unlockedAt && b.unlockedAt) {
      return b.unlockedAt - a.unlockedAt
    }
    return 0
  })

  return (
    <>
      <AppBar 
        position="fixed" 
        className={className}
        sx={{
          zIndex: 40,
          background: 'linear-gradient(180deg, oklch(0.12 0.02 250 / 0.95) 0%, oklch(0.12 0.02 250 / 0.85) 100%)',
          backdropFilter: 'blur(40px)',
          borderBottom: '1px solid oklch(0.25 0.04 250)',
        }}
      >
        <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto', px: 3 }}>
          <Typography 
            variant="h6" 
            component="h1"
            sx={{ 
              flexGrow: 1,
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'oklch(0.98 0.01 250)',
            }}
          >
            NEXUS COMMAND
          </Typography>

          <IconButton
            onClick={() => {
              setActiveTab(0)
              setIsOpen(!isOpen)
            }}
            sx={{ 
              color: 'oklch(0.85 0.03 250)',
              '&:hover': { 
                bgcolor: 'oklch(0.20 0.03 250)',
              },
            }}
          >
            <Badge 
              badgeContent={unreadCount > 99 ? '99+' : unreadCount} 
              color="error"
              invisible={unreadCount === 0}
            >
              <Bell size={24} weight={unreadCount > 0 ? 'fill' : 'regular'} />
            </Badge>
          </IconButton>

          <IconButton
            onClick={() => {
              setActiveTab(1)
              setIsOpen(!isOpen)
            }}
            sx={{ 
              color: 'oklch(0.85 0.03 250)',
              position: 'relative',
              '&:hover': { 
                bgcolor: 'oklch(0.20 0.03 250)',
              },
            }}
          >
            <Trophy size={24} weight="duotone" />
            <Typography 
              sx={{ 
                position: 'absolute',
                bottom: 4,
                right: 4,
                fontSize: '9px',
                fontWeight: 700,
                color: 'oklch(0.70 0.12 230)',
                bgcolor: 'oklch(0.12 0.02 250)',
                px: 0.5,
                borderRadius: 1,
              }}
            >
              {unlockedAchievements}/{totalAchievements}
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: 480,
            maxWidth: '90vw',
            bgcolor: 'oklch(0.12 0.02 250 / 0.98)',
            backdropFilter: 'blur(40px)',
            border: '1px solid oklch(0.25 0.04 250)',
            borderRight: 'none',
            mt: 8,
            height: 'calc(100vh - 64px)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ borderBottom: '1px solid oklch(0.25 0.04 250)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2 }}>
              <Tabs 
                value={activeTab} 
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{ flexGrow: 1 }}
              >
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Bell size={16} />
                      Alerts
                      {unreadCount > 0 && (
                        <Chip 
                          label={unreadCount} 
                          size="small" 
                          color="error"
                          sx={{ height: 20, minWidth: 20, fontSize: '10px', fontWeight: 700 }}
                        />
                      )}
                    </Box>
                  } 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Trophy size={16} />
                      Achievements
                      <Typography 
                        sx={{ 
                          fontSize: '11px', 
                          color: 'oklch(0.70 0.12 230)',
                          fontWeight: 600,
                        }}
                      >
                        {unlockedAchievements}/{totalAchievements}
                      </Typography>
                    </Box>
                  } 
                />
              </Tabs>
              <IconButton 
                onClick={() => setIsOpen(false)}
                sx={{ 
                  color: 'oklch(0.85 0.03 250)',
                  '&:hover': { bgcolor: 'oklch(0.20 0.03 250)' },
                }}
              >
                <X size={20} />
              </IconButton>
            </Box>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {(alerts?.length ?? 0) > 0 && (
                <>
                  <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleClearAll}
                      disabled={unreadCount === 0}
                      fullWidth
                    >
                      Mark All Read
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleDeleteAll}
                      fullWidth
                    >
                      Clear All
                    </Button>
                  </Box>
                  <Divider />
                </>
              )}

              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {sortedAlerts.length === 0 ? (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      py: 8,
                      textAlign: 'center',
                    }}
                  >
                    <Bell size={48} weight="thin" style={{ color: 'oklch(0.35 0.05 250)', marginBottom: 16 }} />
                    <Typography sx={{ fontSize: '14px', color: 'oklch(0.55 0.05 250)' }}>
                      No alerts yet
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {sortedAlerts.map(alert => (
                      <ListItem key={alert.id} sx={{ p: 0 }}>
                        <AlertItem
                          alert={alert}
                          onRead={handleMarkAsRead}
                          onDismiss={handleDismissAlert}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto', p: 2 }}>
              <Paper 
                elevation={0}
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: 'oklch(0.18 0.03 250)',
                  border: '1px solid oklch(0.25 0.04 250)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontSize: '14px', color: 'oklch(0.75 0.03 250)' }}>
                    Progress
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: 'oklch(0.98 0.01 250)',
                    }}
                  >
                    {Math.round((unlockedAchievements / totalAchievements) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(unlockedAchievements / totalAchievements) * 100}
                  sx={{ 
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'oklch(0.25 0.04 250)',
                  }}
                />
              </Paper>

              <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {sortedAchievements.map(achievement => (
                  <ListItem key={achievement.id} sx={{ p: 0 }}>
                    <AchievementCard achievement={achievement} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanel>
        </Box>
      </Drawer>
    </>
  )
}
