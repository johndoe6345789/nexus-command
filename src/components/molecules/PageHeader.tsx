import { Stack, StackProps } from '@mui/material'
import { Text } from '../atoms'
import { motion } from 'framer-motion'

interface PageHeaderProps extends Omit<StackProps, 'children'> {
  title: string
  subtitle?: string
  animated?: boolean
}

export function PageHeader({ title, subtitle, animated = true, ...props }: PageHeaderProps) {
  const content = (
    <Stack spacing={2} {...props}>
      <Text variant="h2">{title}</Text>
      {subtitle && (
        <Text variant="body1" color="text.secondary">
          {subtitle}
        </Text>
      )}
    </Stack>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
