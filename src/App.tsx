import { useState } from 'react'
import { ThemeProvider, Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { muiTheme } from './theme/mui-theme'
import { AnimatedBackground } from './components/AnimatedBackground'
import { TopBar } from './components/organisms/TopBar'
import { MainMenu } from './components/MainMenu'
import { SinglePlayer } from './components/SinglePlayer'
import { Multiplayer } from './components/Multiplayer'
import { Settings } from './components/Settings'
import { PlayerStats } from './components/PlayerStats'
import { Developer } from './components/Developer'
import { Screen } from '@/types'
import { handleNavigate } from '@/handlers'
import { useWelcomeAlerts } from '@/hooks/use-welcome-alerts'
import { useGlobalSpringyScroll } from '@/hooks/use-global-springy-scroll'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main')
  
  useWelcomeAlerts()
  useGlobalSpringyScroll()

  const handleNav = (screen: string) => {
    const newScreen = handleNavigate(screen)
    if (newScreen) {
      setCurrentScreen(newScreen)
    }
  }

  const handleBack = () => {
    setCurrentScreen('main')
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedBackground />
        
        <TopBar />
        
        <Box sx={{ position: 'relative', zIndex: 10, pt: { xs: 7, sm: 8 } }}>
          {currentScreen === 'main' && <MainMenu onNavigate={handleNav} />}
          {currentScreen === 'singleplayer' && <SinglePlayer onBack={handleBack} />}
          {currentScreen === 'multiplayer' && <Multiplayer onBack={handleBack} />}
          {currentScreen === 'settings' && <Settings onBack={handleBack} />}
          {currentScreen === 'stats' && <PlayerStats onBack={handleBack} />}
          {currentScreen === 'developer' && <Developer onBack={handleBack} />}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
