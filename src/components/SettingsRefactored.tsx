import { PageLayout } from './templates'
import { TabbedPanel } from './organisms'
import { AudioControls } from './organisms'
import { GlassCard, ActionButton } from './molecules'
import { Text } from './atoms'
import { Monitor, SpeakerHigh, GameController, User } from '@phosphor-icons/react'
import {
  Stack,
  FormControlLabel,
  Switch,
  TextField,
  Box,
  Button as MuiButton,
} from '@mui/material'
import { useKV } from '@github/spark/hooks'

interface SettingsRefactoredProps {
  onBack: () => void
}

export function SettingsRefactored({ onBack }: SettingsRefactoredProps) {
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

  const tabs = [
    {
      label: 'Graphics',
      icon: Monitor,
      content: (
        <GlassCard hoverable={false}>
          <Stack spacing={4}>
            <Box>
              <Text variant="h6" sx={{ mb: 2 }}>
                Graphics Quality
              </Text>
              <Stack direction="row" spacing={2}>
                {['low', 'medium', 'high', 'ultra'].map((quality) => (
                  <ActionButton
                    key={quality}
                    variant={graphicsQuality === quality ? 'contained' : 'outlined'}
                    onClick={() => setGraphicsQuality(quality)}
                    sx={{ flex: 1, height: '56px' }}
                  >
                    {quality.charAt(0).toUpperCase() + quality.slice(1)}
                  </ActionButton>
                ))}
              </Stack>
            </Box>

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={vsync}
                    onChange={(e) => setVsync(e.target.checked)}
                  />
                }
                label={<Text variant="h6">V-Sync</Text>}
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', ml: 0 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={antiAliasing}
                    onChange={(e) => setAntiAliasing(e.target.checked)}
                  />
                }
                label={<Text variant="h6">Anti-Aliasing</Text>}
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', ml: 0 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={motionBlur}
                    onChange={(e) => setMotionBlur(e.target.checked)}
                  />
                }
                label={<Text variant="h6">Motion Blur</Text>}
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', ml: 0 }}
              />
            </Stack>
          </Stack>
        </GlassCard>
      ),
    },
    {
      label: 'Audio',
      icon: SpeakerHigh,
      content: (
        <GlassCard hoverable={false}>
          <AudioControls
            masterVolume={masterVolume ?? 80}
            musicVolume={musicVolume ?? 60}
            sfxVolume={sfxVolume ?? 90}
            onMasterVolumeChange={setMasterVolume}
            onMusicVolumeChange={setMusicVolume}
            onSfxVolumeChange={setSfxVolume}
          />
        </GlassCard>
      ),
    },
    {
      label: 'Controls',
      icon: GameController,
      content: (
        <GlassCard hoverable={false}>
          <Stack spacing={6}>
            <Box 
              sx={{ 
                p: 3, 
                borderRadius: '12px',
                background: 'rgba(74, 158, 255, 0.05)',
                border: '1px solid rgba(74, 158, 255, 0.2)',
              }}
            >
              <Text variant="h5" sx={{ mb: 2 }}>
                Mouse Sensitivity: {mouseSensitivity}%
              </Text>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={invertY}
                  onChange={(e) => setInvertY(e.target.checked)}
                />
              }
              label={<Text variant="h6">Invert Y-Axis</Text>}
              labelPlacement="start"
              sx={{ justifyContent: 'space-between', ml: 0 }}
            />

            <Box sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <MuiButton variant="outlined" size="large" fullWidth>
                Customize Key Bindings
              </MuiButton>
            </Box>
          </Stack>
        </GlassCard>
      ),
    },
    {
      label: 'Profile',
      icon: User,
      content: (
        <GlassCard hoverable={false}>
          <Stack spacing={4}>
            <TextField
              label="Display Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <Box sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Stack spacing={2}>
                <MuiButton variant="outlined" size="large" fullWidth>
                  Change Avatar
                </MuiButton>
                <MuiButton variant="outlined" size="large" fullWidth>
                  Manage Account
                </MuiButton>
              </Stack>
            </Box>
          </Stack>
        </GlassCard>
      ),
    },
  ]

  return (
    <PageLayout
      title="Settings"
      subtitle="Configure your experience"
      onBack={onBack}
    >
      <TabbedPanel tabs={tabs} />
    </PageLayout>
  )
}
