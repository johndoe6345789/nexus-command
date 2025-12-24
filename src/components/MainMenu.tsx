import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, Users, Robot, Gear, ChartBar, Power } from '@phosphor-icons/react'
import { GlitchText } from './GlitchText'

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { label: 'Single Player', icon: Robot, screen: 'singleplayer', color: 'primary' },
    { label: 'Multiplayer', icon: Users, screen: 'multiplayer', color: 'primary' },
    { label: 'Player Stats', icon: ChartBar, screen: 'stats', color: 'primary' },
    { label: 'Settings', icon: Gear, screen: 'settings', color: 'secondary' },
    { label: 'Exit', icon: Power, screen: 'exit', color: 'destructive' },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-16 w-full"
      >
        <GlitchText className="text-5xl sm:text-6xl md:text-8xl font-black glow-text mb-4">
          ARENA
        </GlitchText>
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent tracking-widest">
          COMMAND SYSTEM
        </div>
        <div className="text-sm text-muted-foreground mt-2 font-body tracking-wider">
          v3.0 | INITIALIZED
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col gap-3 sm:gap-4 w-full max-w-md px-4"
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={item.screen}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Button
              onClick={() => onNavigate(item.screen)}
              className={`
                w-full h-12 sm:h-14 text-base sm:text-lg font-bold tracking-wider relative overflow-hidden
                ${item.color === 'primary' ? 'bg-card hover:bg-primary/20 glow-border' : ''}
                ${item.color === 'secondary' ? 'bg-card hover:bg-secondary glow-border' : ''}
                ${item.color === 'destructive' ? 'bg-card hover:bg-destructive/20 border border-destructive' : ''}
                transition-all duration-200 group
              `}
              variant="outline"
            >
              <span className="flex items-center gap-3 relative z-10">
                <item.icon 
                  size={24} 
                  weight="bold"
                  className={`
                    ${item.color === 'primary' ? 'text-primary group-hover:text-accent' : ''}
                    ${item.color === 'secondary' ? 'text-secondary-foreground' : ''}
                    ${item.color === 'destructive' ? 'text-destructive' : ''}
                    transition-colors
                  `}
                />
                {item.label}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 sm:mt-12 text-xs text-muted-foreground text-center font-body tracking-widest px-4"
      >
        &lt; PRESS ANY BUTTON TO ENGAGE &gt;
      </motion.div>
    </div>
  )
}
