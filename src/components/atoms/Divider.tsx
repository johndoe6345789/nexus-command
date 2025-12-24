import { Divider as MuiDivider, DividerProps as MuiDividerProps } from '@mui/material'

interface DividerProps extends MuiDividerProps {
  glow?: boolean
}

export function Divider({ glow = false, sx, ...props }: DividerProps) {
  return (
    <MuiDivider
      sx={{
        borderColor: glow ? 'oklch(0.75 0.20 220 / 0.5)' : undefined,
        boxShadow: glow ? '0 0 10px oklch(0.75 0.20 220 / 0.3)' : undefined,
        ...sx,
      }}
      {...props}
    />
  )
}
