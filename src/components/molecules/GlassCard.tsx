import { Card as MuiCard, CardContent, CardProps } from '@mui/material'
import { ReactNode } from 'react'

interface GlassCardProps extends Omit<CardProps, 'children'> {
  children: ReactNode
  selected?: boolean
}

export function GlassCard({ 
  children, 
  selected = false,
  sx,
  ...props 
}: GlassCardProps) {
  return (
    <MuiCard 
      sx={{
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'divider',
        ...sx,
      }} 
      {...props}
    >
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  )
}
