import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
  children: string
  className?: string
}

export function GlitchText({ children, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 100)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      animate={isGlitching ? {
        x: [-2, 2, -2, 2, 0],
        transition: { duration: 0.1 }
      } : {}}
    >
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-primary opacity-70"
            style={{ transform: 'translate(-2px, 0)' }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-accent opacity-70"
            style={{ transform: 'translate(2px, 0)' }}
          >
            {children}
          </span>
        </>
      )}
    </motion.div>
  )
}
