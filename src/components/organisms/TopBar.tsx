import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Trophy, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertItem } from '@/components/atoms/AlertItem'
import { AchievementCard } from '@/components/atoms/AchievementCard'
import { Alert, Achievement } from '@/types'
import { ACHIEVEMENT_DEFINITIONS } from '@/constants'
import { useKV } from '@github/spark/hooks'
import { cn } from '@/lib/utils'

interface TopBarProps {
  className?: string
}

export function TopBar({ className }: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'alerts' | 'achievements'>('alerts')
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
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-40 h-16',
          'bg-gradient-to-b from-[oklch(0.12_0.02_250/0.95)] to-[oklch(0.12_0.02_250/0.85)]',
          'backdrop-blur-xl border-b border-[oklch(0.25_0.04_250)]',
          className
        )}
      >
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-heading font-bold text-lg text-[oklch(0.98_0.01_250)] tracking-wide">
              NEXUS COMMAND
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setActiveTab('alerts')
                setIsOpen(!isOpen)
              }}
              className={cn(
                'relative',
                isOpen && activeTab === 'alerts' && 'bg-[oklch(0.20_0.03_250)]'
              )}
            >
              <Bell size={20} weight={unreadCount > 0 ? 'fill' : 'regular'} />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-1 bg-[oklch(0.65_0.20_15)] text-white text-[10px] font-bold"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setActiveTab('achievements')
                setIsOpen(!isOpen)
              }}
              className={cn(
                'relative',
                isOpen && activeTab === 'achievements' && 'bg-[oklch(0.20_0.03_250)]'
              )}
            >
              <Trophy size={20} weight="duotone" />
              <span className="absolute -bottom-1 right-0 text-[9px] font-bold text-[oklch(0.70_0.12_230)]">
                {unlockedAchievements}/{totalAchievements}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-[oklch(0_0_0/0.7)] backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 right-6 z-50 w-[480px] max-h-[calc(100vh-5rem)]"
            >
              <div className="bg-[oklch(0.12_0.02_250/0.98)] backdrop-blur-xl rounded-lg border border-[oklch(0.25_0.04_250)] shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-[oklch(0.25_0.04_250)]">
                  <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="alerts" className="gap-2">
                        <Bell size={16} />
                        Alerts
                        {unreadCount > 0 && (
                          <Badge className="ml-1 h-5 min-w-5 bg-[oklch(0.65_0.20_15)]">
                            {unreadCount}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="achievements" className="gap-2">
                        <Trophy size={16} />
                        Achievements
                        <span className="ml-1 text-xs text-[oklch(0.70_0.12_230)]">
                          {unlockedAchievements}/{totalAchievements}
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="ml-2 flex-shrink-0"
                  >
                    <X size={20} />
                  </Button>
                </div>

                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="alerts" className="m-0">
                    {(alerts?.length ?? 0) > 0 && (
                      <div className="flex gap-2 p-4 border-b border-[oklch(0.25_0.04_250)]">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearAll}
                          disabled={unreadCount === 0}
                          className="flex-1"
                        >
                          Mark All Read
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDeleteAll}
                          className="flex-1"
                        >
                          Clear All
                        </Button>
                      </div>
                    )}

                    <ScrollArea className="h-[500px]">
                      <div className="p-4 space-y-3">
                        {sortedAlerts.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Bell size={48} weight="thin" className="text-[oklch(0.35_0.05_250)] mb-4" />
                            <p className="text-sm text-[oklch(0.55_0.05_250)]">
                              No alerts yet
                            </p>
                          </div>
                        ) : (
                          sortedAlerts.map(alert => (
                            <AlertItem
                              key={alert.id}
                              alert={alert}
                              onRead={handleMarkAsRead}
                              onDismiss={handleDismissAlert}
                            />
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="achievements" className="m-0">
                    <ScrollArea className="h-[548px]">
                      <div className="p-4">
                        <div className="mb-4 p-4 rounded-lg bg-[oklch(0.18_0.03_250)] border border-[oklch(0.25_0.04_250)]">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[oklch(0.75_0.03_250)]">
                              Progress
                            </span>
                            <span className="font-heading font-bold text-[oklch(0.98_0.01_250)]">
                              {Math.round((unlockedAchievements / totalAchievements) * 100)}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {sortedAchievements.map(achievement => (
                            <AchievementCard
                              key={achievement.id}
                              achievement={achievement}
                            />
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
