import { Box, Typography, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import { Icon } from '@phosphor-icons/react'

interface PageHeaderProps {
  title: string
  subtitle: string
  icon?: Icon
  iconColor?: string
}

export function PageHeader({ title, subtitle, icon: IconComponent, iconColor }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 6 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {IconComponent && (
          <IconComponent size={80} weight="duotone" color={iconColor || 'oklch(0.75 0.20 220)'} />
        )}
      </Stack>
    </motion.div>
  )
}
