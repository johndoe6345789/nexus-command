import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface DebugToggleProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function DebugToggle({ title, description, checked, onChange }: DebugToggleProps) {
  return (
    <div className="flex items-center justify-between space-x-4 py-2">
      <div className="flex-1">
        <Label htmlFor={title} className="text-base font-semibold cursor-pointer">
          {title}
        </Label>
        <p className="text-sm text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>
      <Switch
        id={title}
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  )
}
