import { Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

interface BackButtonProps {
  onBack: () => void
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBack />}
      onClick={onBack}
      sx={{
        mb: { xs: 2, sm: 3 },
      }}
    >
      Back to Menu
    </Button>
  )
}
