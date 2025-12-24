import { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface IconProps extends PhosphorIconProps {
  icon: PhosphorIcon
  animated?: boolean
}

export function Icon({ icon: IconComponent, animated = false, ...props }: IconProps) {
  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <IconComponent {...props} />
      </motion.div>
    )
  }
  
  return <IconComponent {...props} />
}
