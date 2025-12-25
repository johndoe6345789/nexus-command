import { Card, CardContent, Stack, Box, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

interface StatCardProps {
  icon: SvgIconComponent
  iconColor: string
  label: string
  value: string | number
  delay?: number
}

export function StatCard({ icon: IconComponent, iconColor, label, value, delay = 0 }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: iconColor,
              opacity: 0.2,
            }}
          >
            <IconComponent sx={{ fontSize: 40, color: iconColor }} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h3" fontWeight="black">
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
