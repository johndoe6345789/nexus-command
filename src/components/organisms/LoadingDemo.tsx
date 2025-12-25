import { Card, CardContent, Stack, Typography, Grid, Box, Divider } from '@mui/material'
import { ProgressBar } from '../atoms/ProgressBar'
import { Spinner } from '../atoms/Spinner'
import { useState, useEffect } from 'react'

export function LoadingDemo() {
  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [progress3, setProgress3] = useState(0)

  useEffect(() => {
    const interval1 = setInterval(() => {
      setProgress1((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)

    const interval2 = setInterval(() => {
      setProgress2((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 100)

    const interval3 = setInterval(() => {
      setProgress3((prev) => (prev >= 100 ? 0 : prev + 5))
    }, 200)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
      clearInterval(interval3)
    }
  }, [])

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Loading Components Demo
        </Typography>

        <Stack spacing={5}>
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Progress Bars
            </Typography>
            <Stack spacing={4}>
              <ProgressBar 
                value={progress1} 
                label="Map Generation"
                color="oklch(0.65 0.25 230)"
              />
              
              <ProgressBar 
                value={progress2} 
                label="Texture Loading"
                color="oklch(0.75 0.25 150)"
                height={10}
              />
              
              <ProgressBar 
                value={progress3} 
                label="Asset Compilation"
                color="oklch(0.75 0.20 40)"
                height={6}
                animated={false}
              />

              <ProgressBar 
                value={75} 
                label="Static Progress"
                showPercentage={true}
                color="oklch(0.65 0.20 280)"
                height={12}
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Spinner Variants
            </Typography>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(74, 158, 255, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(74, 158, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Spinner 
                    size={50}
                    variant="ring"
                    label="Ring"
                    color="oklch(0.65 0.25 230)"
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(74, 158, 255, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(74, 158, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Spinner 
                    size={50}
                    variant="pulse"
                    label="Pulse"
                    color="oklch(0.75 0.25 150)"
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(74, 158, 255, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(74, 158, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Spinner 
                    size={50}
                    variant="dots"
                    label="Dots"
                    color="oklch(0.75 0.20 40)"
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(74, 158, 255, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(74, 158, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Spinner 
                    size={50}
                    variant="orbit"
                    label="Orbit"
                    color="oklch(0.65 0.20 280)"
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(74, 158, 255, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(74, 158, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Spinner 
                    size={50}
                    variant="bars"
                    label="Bars"
                    color="oklch(0.70 0.22 190)"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Different Sizes
            </Typography>
            <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
              <Spinner size={30} variant="ring" color="oklch(0.65 0.25 230)" />
              <Spinner size={40} variant="ring" color="oklch(0.65 0.25 230)" />
              <Spinner size={60} variant="ring" color="oklch(0.65 0.25 230)" />
              <Spinner size={80} variant="ring" color="oklch(0.65 0.25 230)" />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
