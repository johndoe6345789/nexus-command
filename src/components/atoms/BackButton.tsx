import { Button } from '@mui/material'
import { ArrowLeft } from '@phosphor-icons/react'

interface BackButtonProps {
  onBack: () => void
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowLeft size={20} weight="bold" />}
      onClick={onBack}
      sx={{ mb: 4 }}
    >
      Back to Menu
    </Button>
  )
}
