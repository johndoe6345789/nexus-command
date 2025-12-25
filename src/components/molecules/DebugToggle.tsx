import { Box, FormControlLabel, Switch, Typography } from '@mui/material'

interface DebugToggleProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function DebugToggle({ title, description, checked, onChange }: DebugToggleProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" fontWeight="600" sx={{ cursor: 'pointer' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label=""
      />
    </Box>
  )
}
