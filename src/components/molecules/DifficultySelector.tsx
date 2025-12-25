import { Button, Stack } from '@mui/material'

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
    <Stack spacing={1.5}>
      {difficulties.map((diff) => (
        <Button
          key={diff.id}
          variant={selected === diff.id ? 'contained' : 'outlined'}
          onClick={() => onSelect(diff.id)}
          sx={{
            width: '100%',
            height: 56,
            justifyContent: 'flex-start',
            fontSize: '1.125rem',
            fontFamily: 'heading',
            ...(selected !== diff.id && {
              color: diff.color,
              borderColor: diff.color,
            }),
          }}
        >
          {diff.label}
        </Button>
      ))}
    </Stack>
  )
}
