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
      style={{
        paddingInline: '16px',
        paddingTop: '36px',
        paddingBottom: '16px',
      }}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: 560, md: 1080, xl: 1120 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          style={{ marginTop: '28px', marginBottom: '32px' }}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box
            style={{
              paddingInline: '20px',
              paddingBlock: '20px',
            }}
            sx={{
              width: 'min(100%, 34rem)',
              borderRadius: 3,
              backgroundColor: 'rgba(8, 12, 22, 0.72)',
              border: '1px solid rgba(136, 179, 217, 0.14)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.32)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Logo size={88} showText={true} animate={true} />
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{
                  marginTop: '16px',
                  textShadow: '0 1px 18px rgba(0, 0, 0, 0.45)',
                }}
              >
                {tagline}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>{children}</Box>

        {footer}
      </Box>
    </Box>
  )
}
