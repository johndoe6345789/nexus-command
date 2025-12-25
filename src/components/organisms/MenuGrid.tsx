import { Box, Typography, Stack, Card, CardActionArea, CardContent } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

interface MenuItem {
  id: string
  label: string
  icon: SvgIconComponent
  description: string
}

interface MenuGridProps {
  items: MenuItem[]
  onNavigate: (id: string) => void
}

export function MenuGrid({ items, onNavigate }: MenuGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3,
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      {items.map((item) => {
        const IconComponent = item.icon
        return (
          <Card key={item.id}>
            <CardActionArea onClick={() => onNavigate(item.id)} sx={{ height: 160 }}>
              <CardContent>
                <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: 140 }}>
                  <IconComponent sx={{ fontSize: 48, color: 'primary.main' }} />
                  <Stack alignItems="center" spacing={0.5}>
                    <Typography variant="h5">{item.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </Box>
  )
}
