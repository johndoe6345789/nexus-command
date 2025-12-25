import { SpeakerHigh } from '@phosphor-icons/react'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

interface VolumeControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  iconWeight?: 'bold' | 'duotone' | 'fill'
}

export function VolumeControl({ label, value, onChange, iconWeight = 'bold' }: VolumeControlProps) {
  return (
    <div className="p-4 rounded-xl bg-[oklch(0.75_0.20_220/0.05)] border border-[oklch(0.75_0.20_220/0.2)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-[oklch(0.75_0.20_220)]">
          <SpeakerHigh size={28} weight={iconWeight} />
          <h5 className="font-heading text-lg font-semibold">{label}</h5>
        </div>
        <Badge variant="secondary" className="text-sm font-bold">
          {value}%
        </Badge>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  )
}
