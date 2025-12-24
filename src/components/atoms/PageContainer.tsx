import { Box, Card, CardContent } from '@mui/material'
import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  maxWidth?: string
}

export function PageContainer({ children, maxWidth = '1400px' }: PageContainerProps) {
  return (
    <Box sx={{ minHeight: '100vh', p: 4 }}>
      <Box sx={{ maxWidth, mx: 'auto' }}>
        {children}
      </Box>
    </Box>
  )
}
