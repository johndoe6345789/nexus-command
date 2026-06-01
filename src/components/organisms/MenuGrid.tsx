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
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
        gap: { xs: 2, sm: 2.5, md: 3 },
        maxWidth: 1040,
        width: '100%',
        mx: 'auto',
      }}
    >
      {items.map((item) => {
        const IconComponent = item.icon
        return (
          <Card key={item.id} sx={{ height: '100%', borderRadius: 3 }}>
            <CardActionArea
              onClick={() => onNavigate(item.id)}
              sx={{
                height: '100%',
                minHeight: { xs: 150, sm: 176, md: 184 },
              }}
            >
              <CardContent
                sx={{
                  height: '100%',
                  p: { xs: 2.5, sm: 3 },
                  '&:last-child': {
                    pb: { xs: 2.5, sm: 3 },
                  },
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={{ xs: 1.5, sm: 2 }}
                  sx={{ height: '100%', textAlign: 'center' }}
                >
                  <IconComponent
                    sx={{
                      fontSize: { xs: 42, sm: 48, md: 50 },
                      color: 'primary.light',
                      filter: 'drop-shadow(0 0 10px rgba(91, 143, 199, 0.2))',
                    }}
                  />
                  <Stack alignItems="center" spacing={0.75}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: { xs: '1.85rem', sm: '1.65rem', md: '1.8rem' },
                        lineHeight: 1,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        maxWidth: { xs: 260, sm: 220, md: 240 },
                        textWrap: 'balance',
                      }}
                    >
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
