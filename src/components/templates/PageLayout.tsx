import { Box, BoxProps } from '@mui/material'
import { ActionButton, PageHeader } from '../molecules'
import { ArrowLeft } from '@phosphor-icons/react'
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
            icon={ArrowLeft}
            onClick={onBack}
            sx={{ mb: 4 }}
          >
            Back to Menu
          </ActionButton>
        )}

        <PageHeader 
          title={title} 
          subtitle={subtitle} 
          sx={{ mb: 6 }} 
        />

        {children}
      </Box>
    </Box>
  )
}
