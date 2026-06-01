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
import { Logo } from '@/components/Logo'
import { Alert, Achievement } from '@/types'
import { ACHIEVEMENT_DEFINITIONS, APP_VERSION } from '@/constants'
import { useKV } from '@/hooks/useKV'

interface TopBarProps {
  className?: string
}

interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

const mobileTopBarOffset = 'calc(72px + env(safe-area-inset-top, 0px))'
const desktopTopBarOffset = '64px'

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
    setAlerts(
      alerts?.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      ) ?? []
    )
  }

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts?.filter(alert => alert.id !== id) ?? [])
  }

  const handleClearAll = () => {
    setAlerts(alerts?.map(alert => ({ ...alert, read: true })) ?? [])
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
      <AppBar
        position="fixed"
        className={className}
        sx={{
          alignItems: 'center',
          pt: 'env(safe-area-inset-top, 0px)',
          pb: { xs: 0.5, sm: 0 },
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            paddingLeft: { xs: 16, sm: 'clamp(20px, 2.4vw, 72px)' },
            paddingRight: { xs: 16, sm: 'clamp(20px, 2.4vw, 72px)' },
            columnGap: { xs: 4, sm: 1 },
            minHeight: { xs: '72px', sm: '64px' },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            role="heading"
            aria-level={1}
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              minHeight: '100%',
              lineHeight: 1,
              overflow: 'visible',
              whiteSpace: 'nowrap',
              paddingRight: { xs: 4, sm: 1 },
              paddingTop: { xs: 4, sm: 2 },
              paddingBottom: { xs: 4, sm: 2 },
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                minWidth: 0,
                gap: { xs: 0.9, sm: 0.85 },
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                }}
              >
                <Logo size={28} showText={false} animate={false} />
              </Box>

              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: { xs: 0.5, sm: 0.65 },
                  minWidth: 0,
                  fontFamily: "'Rajdhani', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '0.96rem', sm: '1.05rem' },
                  letterSpacing: { xs: '0.05em', sm: '0.09em' },
                  textTransform: 'uppercase',
                  color: 'transparent',
                  background: 'linear-gradient(90deg, oklch(0.87 0.03 235), oklch(0.69 0.12 230), oklch(0.8 0.08 40))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 1px 18px rgba(0, 0, 0, 0.16)',
                }}
              >
                NEXUS
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: '0.9em', sm: '0.82em' },
                    letterSpacing: { xs: '0.08em', sm: '0.14em' },
                    color: 'text.secondary',
                    WebkitTextFillColor: 'currentColor',
                    background: 'none',
                    textShadow: 'none',
                  }}
                >
                  COMMAND
                </Box>
              </Box>
            </Box>
            <Box
              component="span"
              aria-label={`Top bar version ${APP_VERSION}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                ml: { xs: 1, sm: 0.85 },
                px: { xs: 0.8, sm: 0.9 },
                py: { xs: 0.3, sm: 0.35 },
                borderRadius: 999,
                border: '1px solid rgba(136, 179, 217, 0.24)',
                backgroundColor: 'rgba(8, 12, 22, 0.76)',
                color: 'text.secondary',
                fontFamily: "'Rajdhani', system-ui, sans-serif",
                fontSize: { xs: '0.7rem', sm: '0.78rem' },
                fontWeight: 700,
                letterSpacing: '0.08em',
                lineHeight: 1,
                boxShadow: '0 8px 18px rgba(0, 0, 0, 0.16)',
              }}
            >
              {APP_VERSION}
            </Box>
          </Typography>

          <IconButton
            component="a"
            href="https://github.com/johndoe6345789/nexus-command/actions"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Actions"
            color="inherit"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              padding: { sm: 0.55 },
            }}
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
            sx={{ padding: { xs: 8, sm: 6 } }}
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
            sx={{ padding: { xs: 8, sm: 6 } }}
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
            mt: { xs: mobileTopBarOffset, sm: desktopTopBarOffset },
            height: {
              xs: `calc(100vh - ${mobileTopBarOffset})`,
              sm: `calc(100vh - ${desktopTopBarOffset})`,
            },
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
