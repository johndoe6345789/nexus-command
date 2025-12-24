import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { Icon } from '../atoms'
import { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ActionButtonProps extends MuiButtonProps {
  icon?: PhosphorIcon
  iconPosition?: 'start' | 'end'
  iconWeight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  animated?: boolean
}

export function ActionButton({ 
  icon, 
  iconPosition = 'start', 
  iconWeight = 'bold',
  animated = true,
  children,
  ...props 
}: ActionButtonProps) {
  const ButtonContent = (
    <MuiButton 
      {...props}
      startIcon={icon && iconPosition === 'start' ? <Icon icon={icon} weight={iconWeight} size={20} /> : undefined}
      endIcon={icon && iconPosition === 'end' ? <Icon icon={icon} weight={iconWeight} size={20} /> : undefined}
    >
      {children}
    </MuiButton>
  )

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {ButtonContent}
      </motion.div>
    )
  }

  return ButtonContent
}
