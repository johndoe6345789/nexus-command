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
      if (confirm('Exit APEX ARENA?')) {
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
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
            background: 'oklch(0.12 0.02 250 / 0.9)',
            backdropFilter: 'blur(20px)',
            color: 'oklch(0.98 0.01 0)',
            border: '1px solid oklch(0.75 0.20 220 / 0.3)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            fontSize: '14px',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 8px 32px oklch(0 0 0 / 0.4)',
          },
        }}
      />
    </div>
  )
}

export default App
