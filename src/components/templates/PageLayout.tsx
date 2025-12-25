import { Box, BoxProps } from '@mui/material'
import { ActionButton, MoleculePageHeader } from '../molecules'
import { ArrowBack } from '@mui/icons-material'
import { ReactNode } from 'react'

interface PageLayoutProps extends BoxProps {
  title: string
  subtitle?: string
  onBack?: () => void
  children: ReactNode
  maxWidth?: string
}

export function PageLayout({ 
  title, 
  subtitle, 
  onBack, 
  children, 
  maxWidth = '1200px',
  ...props 
}: PageLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', p: 4 }} {...props}>
      <Box sx={{ maxWidth, mx: 'auto' }}>
        {onBack && (
          <ActionButton
            variant="outlined"
            icon={ArrowBack}
            onClick={onBack}
            sx={{ mb: 4 }}
          >
            Back to Menu
          </ActionButton>
        )}

        <MoleculePageHeader 
          title={title} 
          subtitle={subtitle} 
          sx={{ mb: 6 }} 
        />

        {children}
      </Box>
    </Box>
  )
}
