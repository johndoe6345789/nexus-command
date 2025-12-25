import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { motion } from 'framer-motion'

interface ActionButtonProps extends MuiButtonProps {
  icon?: SvgIconComponent
  iconPosition?: 'start' | 'end'
  animated?: boolean
}

export function ActionButton({ 
  icon: IconComponent, 
  iconPosition = 'start', 
  animated = true,
  children,
  ...props 
}: ActionButtonProps) {
  const ButtonContent = (
    <MuiButton 
      {...props}
      startIcon={IconComponent && iconPosition === 'start' ? <IconComponent sx={{ fontSize: 20 }} /> : undefined}
      endIcon={IconComponent && iconPosition === 'end' ? <IconComponent sx={{ fontSize: 20 }} /> : undefined}
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
