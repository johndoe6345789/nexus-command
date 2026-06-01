'use client'

import { Box, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/ErrorFallback'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { TopBar } from '@/components/organisms/TopBar'
import { useWelcomeAlerts } from '@/hooks/use-welcome-alerts'
import { muiTheme } from '@/theme/mui-theme'

const mobileTopBarOffset = 'calc(72px + env(safe-area-inset-top, 0px))'
const desktopTopBarOffset = '64px'

function AppChrome({ children }: { children: React.ReactNode }) {
  useWelcomeAlerts()

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatedBackground />
      <TopBar />
      <Box
        style={{
          paddingTop: '96px',
          paddingBottom: '16px',
        }}
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
