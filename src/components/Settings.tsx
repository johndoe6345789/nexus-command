import { 
  Monitor, 
  VolumeUp, 
  SportsEsports, 
  Person,
  MusicNote,
  Mic
} from '@mui/icons-material'
import { 
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  Button,
  ButtonGroup,
  Slider,
  Switch,
  TextField,
  Stack,
  FormControlLabel,
  Divider
} from '@mui/material'
import { useKV } from '@/hooks/useKV'
import { useState } from 'react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <PageContainer maxWidth="1200px">
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader title="Settings" subtitle="Configure your experience" />

        <Box sx={{ mt: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab icon={<Monitor />} label="Graphics" />
            <Tab icon={<VolumeUp />} label="Audio" />
            <Tab icon={<SportsEsports />} label="Controls" />
            <Tab icon={<Person />} label="Profile" />
          </Tabs>

          {activeTab === 0 && (
            <Card>
              <CardContent>
                <Stack spacing={4}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Graphics Quality
                    </Typography>
                    <ButtonGroup fullWidth variant="outlined" size="large">
                      {['low', 'medium', 'high', 'ultra'].map((quality) => (
                        <Button
                          key={quality}
                          variant={graphicsQuality === quality ? 'contained' : 'outlined'}
                          onClick={() => setGraphicsQuality(quality)}
                        >
                          {quality.charAt(0).toUpperCase() + quality.slice(1)}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                  
                  <Divider />
                  
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={vsync ?? false}
                          onChange={(e) => setVsync(e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight="bold">V-Sync</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Synchronize frame rate with display
                          </Typography>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={antiAliasing ?? true}
                          onChange={(e) => setAntiAliasing(e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight="bold">Anti-Aliasing</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Smooth jagged edges
                          </Typography>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={motionBlur ?? false}
                          onChange={(e) => setMotionBlur(e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight="bold">Motion Blur</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Add motion blur effect
                          </Typography>
                        </Box>
                      }
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent>
                <Stack spacing={4}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <VolumeUp color="primary" />
                      <Typography variant="h6">Master Volume</Typography>
                      <Typography variant="body1" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                        {masterVolume}%
                      </Typography>
                    </Box>
                    <Slider
                      value={masterVolume ?? 80}
                      onChange={(_e, value) => setMasterVolume(value as number)}
                      min={0}
                      max={100}
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <MusicNote color="primary" />
                      <Typography variant="h6">Music Volume</Typography>
                      <Typography variant="body1" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                        {musicVolume}%
                      </Typography>
                    </Box>
                    <Slider
                      value={musicVolume ?? 60}
                      onChange={(_e, value) => setMusicVolume(value as number)}
                      min={0}
                      max={100}
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Mic color="primary" />
                      <Typography variant="h6">SFX Volume</Typography>
                      <Typography variant="body1" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                        {sfxVolume}%
                      </Typography>
                    </Box>
                    <Slider
                      value={sfxVolume ?? 90}
                      onChange={(_e, value) => setSfxVolume(value as number)}
                      min={0}
                      max={100}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card>
              <CardContent>
                <Stack spacing={4}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <SportsEsports color="primary" />
                      <Typography variant="h6">Mouse Sensitivity</Typography>
                      <Typography variant="body1" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                        {mouseSensitivity}%
                      </Typography>
                    </Box>
                    <Slider
                      value={mouseSensitivity ?? 50}
                      onChange={(_e, value) => setMouseSensitivity(value as number)}
                      min={0}
                      max={100}
                    />
                  </Box>
                  
                  <Divider />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={invertY ?? false}
                        onChange={(e) => setInvertY(e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="bold">Invert Y-Axis</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Invert vertical mouse movement
                        </Typography>
                      </Box>
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === 3 && (
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Display Name
                    </Typography>
                    <TextField
                      fullWidth
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Enter your name"
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Box>
      </ContentCard>
    </PageContainer>
  )
}
