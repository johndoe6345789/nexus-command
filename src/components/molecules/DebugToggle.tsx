import { Box, Typography, Switch, FormControlLabel } from '@mui/material'

interface DebugToggleProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function DebugToggle({ title, description, checked, onChange }: DebugToggleProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      }
      labelPlacement="start"
      sx={{ justifyContent: 'space-between', ml: 0 }}
    />
  )
}
