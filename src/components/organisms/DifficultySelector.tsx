import { Stack } from '@mui/material'
import { ActionButton } from '../molecules'
import { Text, GlowBox } from '../atoms'
import { motion } from 'framer-motion'

interface DifficultyOption {
  id: string
  label: string
  color: string
}

interface DifficultySelectorProps {
  difficulties: DifficultyOption[]
  selectedDifficulty: string
  onSelectDifficulty: (id: string) => void
}

export function DifficultySelector({ 
  difficulties, 
  selectedDifficulty, 
  onSelectDifficulty 
}: DifficultySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Text variant="h4" sx={{ mb: 3 }}>
        Difficulty
      </Text>
      <Stack spacing={2}>
        {difficulties.map((diff) => (
          <ActionButton
            key={diff.id}
            variant={selectedDifficulty === diff.id ? 'contained' : 'outlined'}
            onClick={() => onSelectDifficulty(diff.id)}
            animated={false}
            sx={{
              height: '56px',
              justifyContent: 'flex-start',
              fontSize: '1.125rem',
              ...(selectedDifficulty !== diff.id && {
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
          </ActionButton>
        ))}
      </Stack>
    </motion.div>
  )
}
