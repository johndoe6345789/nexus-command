import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'
  align?: 'left' | 'center' | 'right'
  color?: string
  animated?: boolean
  gradient?: boolean
  className?: string
  sx?: Record<string, any>
  children: ReactNode
}

export function Text({ 
  animated = false, 
  gradient = false, 
  children, 
  variant = 'body1',
  align = 'left',
  color,
  className,
  sx,
}: TextProps) {
  const variantClasses = {
    h1: 'text-5xl font-bold font-heading',
    h2: 'text-4xl font-bold font-heading',
    h3: 'text-3xl font-bold font-heading',
    h4: 'text-2xl font-bold font-heading',
    h5: 'text-xl font-semibold font-heading',
    h6: 'text-lg font-semibold font-heading',
    body1: 'text-base',
    body2: 'text-sm',
    caption: 'text-xs',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const gradientStyle = gradient ? 
    'bg-gradient-to-r from-[oklch(0.75_0.20_220)] to-[oklch(0.70_0.18_35)] bg-clip-text text-transparent' : ''

  const colorClass = color === 'text.secondary' ? 'text-muted-foreground' : ''

  const combinedClassName = cn(
    variantClasses[variant],
    alignClasses[align],
    gradientStyle,
    colorClass,
    className
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={combinedClassName}
        style={sx}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={combinedClassName} style={sx}>
      {children}
    </div>
  )
}
