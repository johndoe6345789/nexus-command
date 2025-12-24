import { Grid, Box } from '@mui/material'
import { PageLayout } from './PageLayout'
import { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  title: string
  subtitle?: string
  onBack?: () => void
  leftColumn: ReactNode
  rightColumn: ReactNode
  leftColumnSize?: number
  rightColumnSize?: number
}

export function TwoColumnLayout({ 
  title, 
  subtitle, 
  onBack,
  leftColumn,
  rightColumn,
  leftColumnSize = 8,
  rightColumnSize = 4,
}: TwoColumnLayoutProps) {
  return (
    <PageLayout title={title} subtitle={subtitle} onBack={onBack} maxWidth="1400px">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: leftColumnSize }}>
          {leftColumn}
        </Grid>
        <Grid size={{ xs: 12, lg: rightColumnSize }}>
          {rightColumn}
        </Grid>
      </Grid>
    </PageLayout>
  )
}
