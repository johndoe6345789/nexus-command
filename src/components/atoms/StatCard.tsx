import { Card, CardContent, Stack, Box, Typography } from '@mui/material'
import { Icon } from '@phosphor-icons/react'

interface StatCardProps {
  icon: Icon
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
            <IconComponent size={40} weight="bold" color={iconColor} />
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
