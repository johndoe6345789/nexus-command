import { Card, CardContent } from '@mui/material'
import { ReactNode } from 'react'

interface ContentCardProps {
  children: ReactNode
  noPadding?: boolean
}

export function ContentCard({ children, noPadding = false }: ContentCardProps) {
  return (
    <Card
      sx={{
        p: noPadding ? 0 : 4,
        bgcolor: 'rgba(10, 15, 30, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(74, 158, 255, 0.2)',
      }}
    >
      <CardContent sx={{ p: noPadding ? 0 : undefined }}>
        {children}
      </CardContent>
    </Card>
  )
}
