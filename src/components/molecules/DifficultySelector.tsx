import { Button } from '@/components/ui/button'

interface Difficulty {
  id: string
  label: string
  color: string
}

interface DifficultySelectorProps {
  difficulties: Difficulty[]
  selected: string
  onSelect: (id: string) => void
}

export function DifficultySelector({ difficulties, selected, onSelect }: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      {difficulties.map((diff) => (
        <Button
          key={diff.id}
          variant={selected === diff.id ? 'default' : 'outline'}
          onClick={() => onSelect(diff.id)}
          className="w-full h-14 justify-start text-lg font-heading"
          style={
            selected !== diff.id
              ? {
                  color: diff.color,
                  borderColor: diff.color,
                }
              : undefined
          }
        >
          {diff.label}
        </Button>
      ))}
    </div>
  )
}
