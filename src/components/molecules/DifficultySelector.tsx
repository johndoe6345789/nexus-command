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
    <Stack spacing={2}>
      {difficulties.map((diff) => (
        <Button
          key={diff.id}
          variant={selected === diff.id ? 'contained' : 'outlined'}
          onClick={() => onSelect(diff.id)}
          sx={{
            height: '56px',
            justifyContent: 'flex-start',
            fontSize: '1.125rem',
            ...(selected !== diff.id && {
              color: diff.color,
              borderColor: diff.color,
              '&:hover': {
                borderColor: diff.color,
                bgcolor: `${diff.color}15`,
              },
            }),
          }}
        >
          {diff.label}
        </Button>
      ))}
    </Stack>
  )
}
