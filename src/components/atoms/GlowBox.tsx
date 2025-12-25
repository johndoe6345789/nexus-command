import { Box, BoxProps } from '@mui/material'

export function GlowBox({ sx, children, ...props }: BoxProps) {
  return (
    <Box sx={sx} {...props}>
      {children}
    </Box>
  )
}
