'use client'

import { Box, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/ErrorFallback'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { TopBar } from '@/components/organisms/TopBar'
import { useDeployedVersionRefresh } from '@/hooks/use-deployed-version-refresh'
import { useWelcomeAlerts } from '@/hooks/use-welcome-alerts'
import layoutStyles from '@/styles/layout.module.scss'
import { muiTheme } from '@/theme/mui-theme'

function AppChrome({ children }: { children: React.ReactNode }) {
  useDeployedVersionRefresh()
  useWelcomeAlerts()

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatedBackground />
      <TopBar />
      <Box
        className={layoutStyles.appContent}
        sx={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppChrome>{children}</AppChrome>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
