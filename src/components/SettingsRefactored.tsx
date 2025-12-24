import { Card, CardContent, TextField, Stack, Tabs, Tab, Button } from '@mui/material'
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
  const [activeTab, setActiveTab] = useState(0)

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
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ mb: 4 }}
          >
            <Tab
              icon={<Monitor size={20} weight="bold" />}
              iconPosition="start"
              label="Graphics"
            />
            <Tab
              icon={<SpeakerHigh size={20} weight="bold" />}
              iconPosition="start"
              label="Audio"
            />
            <Tab
              icon={<GameController size={20} weight="bold" />}
              iconPosition="start"
              label="Controls"
            />
            <Tab
              icon={<User size={20} weight="bold" />}
              iconPosition="start"
              label="Profile"
            />
          </Tabs>

          {activeTab === 0 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={4}>
                  <Stack direction="row" spacing={2}>
                    {['low', 'medium', 'high', 'ultra'].map((quality) => (
                      <Button
                        key={quality}
                        variant={graphicsQuality === quality ? 'contained' : 'outlined'}
                        onClick={() => setGraphicsQuality(quality)}
                        sx={{ flex: 1, height: '56px' }}
                      >
                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                      </Button>
                    ))}
                  </Stack>
                  <Stack spacing={2}>
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
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={6}>
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
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={6}>
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
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 3 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={4}>
                  <TextField
                    label="Display Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </ContentCard>
    </PageContainer>
  )
}
