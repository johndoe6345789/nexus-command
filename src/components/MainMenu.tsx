import { Button } from '@/components/ui/button'
import { Play, Users, Gear, ChartBar, SignOut } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface MainMenuProps {
  onNavigate: (screen: string) => void
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { id: 'singleplayer', label: 'Campaign', icon: Play, description: 'Single player missions' },
    { id: 'multiplayer', label: 'Multiplayer', icon: Users, description: 'Join online battles' },
    { id: 'stats', label: 'Profile', icon: ChartBar, description: 'View your stats' },
    { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure your game' },
    { id: 'exit', label: 'Exit', icon: SignOut, description: 'Close application' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h1 className="text-8xl font-black tracking-tight mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[glow-pulse_3s_ease-in-out_infinite]">
            APEX ARENA
          </h1>
          <p className="text-muted-foreground text-lg tracking-wider uppercase">
            Next Generation Combat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button
                variant="outline"
                className="w-full h-32 glass-panel hover:glow-border group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
                onClick={() => onNavigate(item.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon size={32} weight="bold" className="text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold tracking-wide uppercase">
                      {item.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center text-muted-foreground text-sm"
        >
          <p>v2.0.1 • Press any key to continue</p>
        </motion.div>
      </div>
    </div>
  )
}
