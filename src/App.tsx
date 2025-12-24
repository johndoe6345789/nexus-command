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
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
            background: 'oklch(0.16 0.03 250 / 0.95)',
            backdropFilter: 'blur(20px)',
            color: 'oklch(0.98 0.01 250)',
            border: '2px solid oklch(0.68 0.28 245)',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
            fontSize: '14px',
            padding: '16px 24px',
            boxShadow: '0 0 30px oklch(0.68 0.28 245 / 0.4), 0 10px 40px rgba(0, 0, 0, 0.5)',
          },
        }}
      />
    </div>
  )
}

export default App
