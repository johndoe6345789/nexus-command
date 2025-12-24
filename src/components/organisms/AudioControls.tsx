import { Stack } from '@mui/material'
import { VolumeSlider } from '../molecules'
import { SpeakerHigh } from '@phosphor-icons/react'

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
        icon={SpeakerHigh}
        iconWeight="bold"
        value={masterVolume}
        onChange={onMasterVolumeChange}
      />
      <VolumeSlider
        label="Music Volume"
        icon={SpeakerHigh}
        iconWeight="duotone"
        value={musicVolume}
        onChange={onMusicVolumeChange}
      />
      <VolumeSlider
        label="SFX Volume"
        icon={SpeakerHigh}
        iconWeight="fill"
        value={sfxVolume}
        onChange={onSfxVolumeChange}
      />
    </Stack>
  )
}
