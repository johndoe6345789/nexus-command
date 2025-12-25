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
import { Notifications, EmojiEvents, Close, GitHub } from '@mui/icons-material'
import { AlertItem } from '@/components/atoms/AlertItem'
import { AchievementCard } from '@/components/atoms/AchievementCard'
import { PullToRefresh } from '@/components/atoms/PullToRefresh'
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

  const handleRefreshAlerts = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
  }

  const handleRefreshAchievements = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
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
      <AppBar position="fixed" className={className}>
        <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: 3 }}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            NEXUS COMMAND
          </Typography>

          <IconButton
            component="a"
            href="https://github.com/johndoe6345789/nexus-command/actions"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Actions"
            color="inherit"
          >
            <GitHub titleAccess="GitHub Actions" />
          </IconButton>

          <IconButton
            onClick={() => {
              setActiveTab(0)
              setIsOpen(!isOpen)
            }}
            aria-label="Notifications"
            color="inherit"
          >
            <Badge badgeContent={unreadCount > 99 ? '99+' : unreadCount} color="error">
              <Notifications titleAccess="Notifications" />
            </Badge>
          </IconButton>

          <IconButton
            onClick={() => {
              setActiveTab(1)
              setIsOpen(!isOpen)
            }}
            aria-label="Achievements"
            color="inherit"
          >
            <Badge badgeContent={`${unlockedAchievements}/${totalAchievements}`} color="primary">
              <EmojiEvents titleAccess="Achievements" />
            </Badge>
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
            mt: { xs: 7, sm: 8 },
            height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2 }}>
              <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ flexGrow: 1 }}>
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Notifications fontSize="small" titleAccess="" />
                      Alerts
                      {unreadCount > 0 && <Chip label={unreadCount} size="small" color="error" />}
                    </Box>
                  } 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmojiEvents fontSize="small" titleAccess="" />
                      Achievements
                      <Typography variant="caption" color="text.secondary">
                        {unlockedAchievements}/{totalAchievements}
                      </Typography>
                    </Box>
                  } 
                />
              </Tabs>
              <IconButton onClick={() => setIsOpen(false)} aria-label="Close">
                <Close titleAccess="Close" />
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
                    <Button variant="outlined" size="small" onClick={handleDeleteAll} fullWidth>
                      Clear All
                    </Button>
                  </Box>
                  <Divider />
                </>
              )}

              <PullToRefresh onRefresh={handleRefreshAlerts}>
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {sortedAlerts.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                      <Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.3 }} titleAccess="No notifications" />
                      <Typography color="text.secondary">No alerts yet</Typography>
                    </Box>
                  ) : (
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {sortedAlerts.map(alert => (
                        <ListItem key={alert.id}>
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
              </PullToRefresh>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <PullToRefresh onRefresh={handleRefreshAchievements}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto', p: 2 }}>
                <Paper elevation={0} sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Progress</Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {Math.round((unlockedAchievements / totalAchievements) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(unlockedAchievements / totalAchievements) * 100}
                  />
                </Paper>

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {sortedAchievements.map(achievement => (
                    <ListItem key={achievement.id}>
                      <AchievementCard achievement={achievement} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </PullToRefresh>
          </TabPanel>
        </Box>
      </Drawer>
    </>
  )
}
