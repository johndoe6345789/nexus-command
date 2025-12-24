import { Box, BoxProps } from '@mui/material'
import { Logo } from '../Logo'
import { Text } from '../atoms'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MainMenuLayoutProps extends BoxProps {
  tagline?: string
  children: ReactNode
  footer?: ReactNode
}

export function MainMenuLayout({ 
  tagline = 'Next Generation Combat',
  children, 
  footer,
  ...props 
}: MainMenuLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
      {...props}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 10,
          }}
        >
          <Logo size={100} showText={true} animate={true} />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Text
              variant="body1"
              align="center"
              sx={{
                color: 'text.secondary',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mt: 3,
              }}
            >
              {tagline}
            </Text>
          </motion.div>
        </Box>

        {children}

        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {footer}
          </motion.div>
        )}
      </Box>
    </Box>
  )
}
