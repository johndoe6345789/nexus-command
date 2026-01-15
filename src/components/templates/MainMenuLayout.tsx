import { Box, BoxProps, Typography } from '@mui/material'
import { Logo } from '../Logo'
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        pt: { xs: 4, sm: 6 },
      }}
      {...props}
    >
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 10 }}>
          <Logo size={100} showText={true} animate={true} />
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 3 }}>
            {tagline}
          </Typography>
        </Box>

        {children}

        {footer}
      </Box>
    </Box>
  )
}
