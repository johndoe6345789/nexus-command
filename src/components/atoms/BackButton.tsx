import { Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

interface BackButtonProps {
  onBack: () => void
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBack sx={{ fontSize: 20 }} />}
      onClick={onBack}
      sx={{ mb: 4 }}
    >
      Back to Menu
    </Button>
  )
}
