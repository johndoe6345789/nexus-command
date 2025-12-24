import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, Users, Robot, Gear, ChartBar, Power } from '@phosphor-icons/react'
import { GlitchText } from './GlitchText'

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { label: 'Single Player', icon: Robot, screen: 'singleplayer', color: 'primary', description: 'Train against AI opponents' },
    { label: 'Multiplayer', icon: Users, screen: 'multiplayer', color: 'primary', description: 'Join online battles' },
    { label: 'Player Stats', icon: ChartBar, screen: 'stats', color: 'primary', description: 'View your combat record' },
    { label: 'Settings', icon: Gear, screen: 'settings', color: 'secondary', description: 'Configure system' },
    { label: 'Exit', icon: Power, screen: 'exit', color: 'destructive', description: 'Terminate session' },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 sm:mb-20 w-full"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlitchText className="text-6xl sm:text-7xl md:text-9xl font-black glow-text mb-6">
            ARENA
          </GlitchText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent tracking-[0.3em] mb-4"
        >
          COMMAND SYSTEM
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-sm text-muted-foreground mt-4 font-body tracking-wider"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
          <span>v3.2.1 | SYSTEM ONLINE</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col gap-6 sm:gap-8 w-full max-w-3xl px-6"
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={item.screen}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, x: 10 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={() => onNavigate(item.screen)}
              className={`
                w-full h-20 sm:h-24 text-lg sm:text-xl font-black tracking-[0.15em] relative overflow-hidden group
                ${item.color === 'primary' ? 'bg-card/40 hover:bg-primary/15 glow-border' : ''}
                ${item.color === 'secondary' ? 'bg-card/40 hover:bg-secondary/20 glow-border' : ''}
                ${item.color === 'destructive' ? 'bg-card/40 hover:bg-destructive/15 border-2 border-destructive/50' : ''}
                backdrop-blur-md transition-all duration-300
                shadow-[0_0_30px_rgba(0,0,0,0.3)]
                hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]
              `}
              variant="outline"
            >
              <span className="flex items-center justify-between w-full relative z-10 px-4">
                <span className="flex items-center gap-6">
                  <div className={`
                    p-3 rounded-md transition-all duration-300
                    ${item.color === 'primary' ? 'bg-primary/20 group-hover:bg-primary/30' : ''}
                    ${item.color === 'secondary' ? 'bg-secondary/20 group-hover:bg-secondary/30' : ''}
                    ${item.color === 'destructive' ? 'bg-destructive/20 group-hover:bg-destructive/30' : ''}
                  `}>
                    <item.icon 
                      size={32} 
                      weight="bold"
                      className={`
                        ${item.color === 'primary' ? 'text-primary group-hover:text-accent' : ''}
                        ${item.color === 'secondary' ? 'text-secondary-foreground' : ''}
                        ${item.color === 'destructive' ? 'text-destructive' : ''}
                        transition-all duration-300
                      `}
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-lg sm:text-xl">{item.label}</div>
                    <div className="text-sm text-muted-foreground font-normal tracking-wider hidden sm:block mt-1">
                      {item.description}
                    </div>
                  </div>
                </span>
                <motion.div
                  className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <Play size={20} weight="fill" />
                </motion.div>
              </span>
              
              <motion.div
                className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none
                `}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              <motion.div
                className={`
                  absolute bottom-0 left-0 right-0 h-1
                  ${item.color === 'primary' ? 'bg-primary' : ''}
                  ${item.color === 'secondary' ? 'bg-secondary' : ''}
                  ${item.color === 'destructive' ? 'bg-destructive' : ''}
                  shadow-lg opacity-0 group-hover:opacity-100
                `}
                style={{
                  boxShadow: `0 0 20px ${item.color === 'primary' ? 'oklch(0.68 0.28 245)' : item.color === 'destructive' ? 'oklch(0.58 0.28 28)' : 'oklch(0.30 0.10 250)'}`,
                }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 sm:mt-16 text-xs text-muted-foreground text-center font-body tracking-[0.2em] px-4 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <span>SELECT PROTOCOL TO ENGAGE</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 text-xs text-muted-foreground/50 font-body tracking-wider"
      >
        <span>BUILD 2024.12</span>
        <span>•</span>
        <span>NEURAL CORE v4.7</span>
        <span>•</span>
        <span>QUANTUM READY</span>
      </motion.div>
    </div>
  )
}
