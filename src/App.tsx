import { useState } from 'react'
import { AnimatedBackground } from './components/AnimatedBackground'
import { MainMenu } from './components/MainMenu'
import { SinglePlayer } from './components/SinglePlayer'
import { Multiplayer } from './components/Multiplayer'
import { Settings } from './components/Settings'
import { PlayerStats } from './components/PlayerStats'
import { Toaster } from '@/components/ui/sonner'
import { motion, AnimatePresence } from 'framer-motion'

type Screen = 'main' | 'singleplayer' | 'multiplayer' | 'settings' | 'stats' | 'exit'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main')

  const handleNavigate = (screen: string) => {
    if (screen === 'exit') {
      if (confirm('EXIT ARENA COMMAND SYSTEM?')) {
        window.close()
      }
      return
    }
    setCurrentScreen(screen as Screen)
  }

  const handleBack = () => {
    setCurrentScreen('main')
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-foreground">
      <AnimatedBackground />
      
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentScreen === 'main' && <MainMenu onNavigate={handleNavigate} />}
            {currentScreen === 'singleplayer' && <SinglePlayer onBack={handleBack} />}
            {currentScreen === 'multiplayer' && <Multiplayer onBack={handleBack} />}
            {currentScreen === 'settings' && <Settings onBack={handleBack} />}
            {currentScreen === 'stats' && <PlayerStats onBack={handleBack} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'oklch(0.18 0.02 250)',
            color: 'oklch(0.98 0 0)',
            border: '1px solid oklch(0.65 0.25 250)',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  )
}

export default App
