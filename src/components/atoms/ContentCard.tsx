import { Card, CardContent, CardProps } from '@mui/material'
import { ReactNode } from 'react'

interface ContentCardProps extends CardProps {
  children: ReactNode
}

export function ContentCard({ children, ...props }: ContentCardProps) {
  return (
    <Card {...props}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
