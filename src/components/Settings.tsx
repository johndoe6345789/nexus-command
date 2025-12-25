import { Monitor, SpeakerHigh, GameController, User } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { useState } from 'react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { VolumeControl } from './molecules/VolumeControl'
import { DebugToggle } from './molecules/DebugToggle'
import { SettingsProps } from './props'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Settings({ onBack }: SettingsProps) {
  const [graphicsQuality, setGraphicsQuality] = useKV<string>('graphics-quality', 'high')
  const [masterVolume, setMasterVolume] = useKV<number>('master-volume', 80)
  const [musicVolume, setMusicVolume] = useKV<number>('music-volume', 60)
  const [sfxVolume, setSfxVolume] = useKV<number>('sfx-volume', 90)
  const [mouseSensitivity, setMouseSensitivity] = useKV<number>('mouse-sensitivity', 50)
  const [invertY, setInvertY] = useKV<boolean>('invert-y', false)
  const [playerName, setPlayerName] = useKV<string>('player-name', 'Operator')
  const [vsync, setVsync] = useKV<boolean>('vsync', false)
  const [antiAliasing, setAntiAliasing] = useKV<boolean>('anti-aliasing', true)
  const [motionBlur, setMotionBlur] = useKV<boolean>('motion-blur', false)
  const [activeTab, setActiveTab] = useState('graphics')

  return (
    <PageContainer maxWidth="1200px">
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader title="Settings" subtitle="Configure your experience" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="graphics" className="gap-2">
                <Monitor size={20} weight="bold" />
                <span className="hidden sm:inline">Graphics</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="gap-2">
                <SpeakerHigh size={20} weight="bold" />
                <span className="hidden sm:inline">Audio</span>
              </TabsTrigger>
              <TabsTrigger value="controls" className="gap-2">
                <GameController size={20} weight="bold" />
                <span className="hidden sm:inline">Controls</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User size={20} weight="bold" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="graphics">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['low', 'medium', 'high', 'ultra'].map((quality) => (
                      <Button
                        key={quality}
                        variant={graphicsQuality === quality ? 'default' : 'outline'}
                        onClick={() => setGraphicsQuality(quality)}
                        className="h-14 font-heading"
                      >
                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <DebugToggle
                      title="V-Sync"
                      description="Synchronize frame rate with display"
                      checked={vsync ?? false}
                      onChange={setVsync}
                    />
                    <DebugToggle
                      title="Anti-Aliasing"
                      description="Smooth jagged edges"
                      checked={antiAliasing ?? true}
                      onChange={setAntiAliasing}
                    />
                    <DebugToggle
                      title="Motion Blur"
                      description="Add motion blur effect"
                      checked={motionBlur ?? false}
                      onChange={setMotionBlur}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio">
              <Card>
                <CardContent className="p-6 space-y-8">
                  <VolumeControl
                    label="Master Volume"
                    value={masterVolume ?? 80}
                    onChange={setMasterVolume}
                    iconWeight="bold"
                  />
                  <VolumeControl
                    label="Music Volume"
                    value={musicVolume ?? 60}
                    onChange={setMusicVolume}
                    iconWeight="duotone"
                  />
                  <VolumeControl
                    label="SFX Volume"
                    value={sfxVolume ?? 90}
                    onChange={setSfxVolume}
                    iconWeight="fill"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="controls">
              <Card>
                <CardContent className="p-6 space-y-8">
                  <VolumeControl
                    label="Mouse Sensitivity"
                    value={mouseSensitivity ?? 50}
                    onChange={setMouseSensitivity}
                    iconWeight="bold"
                  />
                  <DebugToggle
                    title="Invert Y-Axis"
                    description="Invert vertical mouse movement"
                    checked={invertY ?? false}
                    onChange={setInvertY}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <Label htmlFor="player-name" className="text-base">Display Name</Label>
                    <Input
                      id="player-name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </ContentCard>
    </PageContainer>
  )
}
