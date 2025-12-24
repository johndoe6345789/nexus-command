import {
  Button,
  Card,
  CardContent,
  TextField,
  Slider,
  Switch,
  Tabs,
  Tab,
  Box,
  Typography,
  Stack,
  FormControlLabel,
  Chip,
} from '@mui/material'
import { ArrowLeft, Monitor, SpeakerHigh, GameController, User } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { useState } from 'react'

interface SettingsProps {
  onBack: () => void
}

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
    <Box sx={{ minHeight: '100vh', p: 4 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={20} weight="bold" />}
            onClick={onBack}
            sx={{ mb: 4 }}
          >
            Back to Menu
          </Button>

          <Typography variant="h2" sx={{ mb: 2 }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            Configure your experience
          </Typography>
        </motion.div>

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
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Visual Settings
                </Typography>
                <Stack spacing={4}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Graphics Quality
                    </Typography>
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
                  </Box>

                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={vsync}
                          onChange={(e) => setVsync(e.target.checked)}
                        />
                      }
                      label={<Typography variant="h6">V-Sync</Typography>}
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
                      label={<Typography variant="h6">Anti-Aliasing</Typography>}
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
                      label={<Typography variant="h6">Motion Blur</Typography>}
                      labelPlacement="start"
                      sx={{ justifyContent: 'space-between', ml: 0 }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Audio Settings
                </Typography>
                <Stack spacing={4}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6">Master Volume</Typography>
                      <Chip label={`${masterVolume}%`} />
                    </Stack>
                    <Slider
                      value={masterVolume ?? 80}
                      onChange={(_, value) => setMasterVolume(value as number)}
                      max={100}
                      valueLabelDisplay="auto"
                    />
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6">Music Volume</Typography>
                      <Chip label={`${musicVolume}%`} />
                    </Stack>
                    <Slider
                      value={musicVolume ?? 60}
                      onChange={(_, value) => setMusicVolume(value as number)}
                      max={100}
                      valueLabelDisplay="auto"
                    />
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6">SFX Volume</Typography>
                      <Chip label={`${sfxVolume}%`} />
                    </Stack>
                    <Slider
                      value={sfxVolume ?? 90}
                      onChange={(_, value) => setSfxVolume(value as number)}
                      max={100}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Control Settings
                </Typography>
                <Stack spacing={4}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6">Mouse Sensitivity</Typography>
                      <Chip label={`${mouseSensitivity}%`} />
                    </Stack>
                    <Slider
                      value={mouseSensitivity ?? 50}
                      onChange={(_, value) => setMouseSensitivity(value as number)}
                      max={100}
                      valueLabelDisplay="auto"
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={invertY}
                        onChange={(e) => setInvertY(e.target.checked)}
                      />
                    }
                    label={<Typography variant="h6">Invert Y-Axis</Typography>}
                    labelPlacement="start"
                    sx={{ justifyContent: 'space-between', ml: 0 }}
                  />

                  <Box sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button variant="outlined" size="large" fullWidth>
                      Customize Key Bindings
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 3 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Player Profile
                </Typography>
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
                      <Button variant="outlined" size="large" fullWidth>
                        Change Avatar
                      </Button>
                      <Button variant="outlined" size="large" fullWidth>
                        Manage Account
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </Box>
    </Box>
  )
}
