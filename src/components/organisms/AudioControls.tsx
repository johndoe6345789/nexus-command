import { Stack } from '@mui/material'
import { VolumeSlider } from '../molecules'
import { VolumeUp } from '@mui/icons-material'

interface AudioControlsProps {
  masterVolume: number
  musicVolume: number
  sfxVolume: number
  onMasterVolumeChange: (value: number) => void
  onMusicVolumeChange: (value: number) => void
  onSfxVolumeChange: (value: number) => void
}

export function AudioControls({
  masterVolume,
  musicVolume,
  sfxVolume,
  onMasterVolumeChange,
  onMusicVolumeChange,
  onSfxVolumeChange,
}: AudioControlsProps) {
  return (
    <Stack spacing={6}>
      <VolumeSlider
        label="Master Volume"
        icon={VolumeUp}
        value={masterVolume}
        onChange={onMasterVolumeChange}
      />
      <VolumeSlider
        label="Music Volume"
        icon={VolumeUp}
        value={musicVolume}
        onChange={onMusicVolumeChange}
      />
      <VolumeSlider
        label="SFX Volume"
        icon={VolumeUp}
        value={sfxVolume}
        onChange={onSfxVolumeChange}
      />
    </Stack>
  )
}
