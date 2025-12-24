import {
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  Typography,
  Stack,
  Grid,
} from '@mui/material'
import { ArrowLeft, Trophy, Crosshair, Target, Skull } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

interface PlayerStatsProps {
  onBack: () => void
}

export function PlayerStats({ onBack }: PlayerStatsProps) {
  const [playerName] = useKV<string>('player-name', 'Operator')

  const stats = {
    kills: 1247,
    deaths: 523,
    wins: 142,
    losses: 89,
    accuracy: 68,
    headshots: 412,
    longestKillStreak: 23,
    playtime: '127h 32m',
  }

  const kd = (stats.kills / stats.deaths).toFixed(2)
  const winRate = ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1)

  const recentMatches = [
    { map: 'Aegis Station', mode: 'TDM', result: 'Victory', score: '25-8', date: '2h ago' },
    { map: 'Outpost Zero', mode: 'CTF', result: 'Victory', score: '18-12', date: '5h ago' },
    { map: 'Nexus Core', mode: 'DOM', result: 'Defeat', score: '12-15', date: '1d ago' },
    { map: 'Meridian City', mode: 'TDM', result: 'Victory', score: '31-9', date: '1d ago' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', p: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={20} weight="bold" />}
          onClick={onBack}
          sx={{ mb: 4 }}
        >
          Back to Menu
        </Button>

        <Card sx={{ 
          p: 4, 
          bgcolor: 'rgba(10, 15, 30, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(74, 158, 255, 0.2)',
        }}>
          <CardContent sx={{ p: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 6 }}>
                <Box>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    Profile
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {playerName} • Level 42 • Elite Rank
                  </Typography>
                </Box>
                <Trophy size={80} weight="duotone" color="oklch(0.70 0.18 35)" />
              </Stack>
            </motion.div>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        opacity: 0.2,
                      }}
                    >
                      <Crosshair size={40} weight="bold" color="oklch(0.75 0.20 220)" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        K/D Ratio
                      </Typography>
                      <Typography variant="h3" fontWeight="black">
                        {kd}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'secondary.main',
                        opacity: 0.2,
                      }}
                    >
                      <Trophy size={40} weight="bold" color="oklch(0.70 0.18 35)" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Win Rate
                      </Typography>
                      <Typography variant="h3" fontWeight="black">
                        {winRate}%
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#4ade80',
                        opacity: 0.2,
                      }}
                    >
                      <Target size={40} weight="bold" color="#4ade80" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Accuracy
                      </Typography>
                      <Typography variant="h3" fontWeight="black">
                        {stats.accuracy}%
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#f87171',
                        opacity: 0.2,
                      }}
                    >
                      <Skull size={40} weight="bold" color="#f87171" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Headshots
                      </Typography>
                      <Typography variant="h3" fontWeight="black">
                        {stats.headshots}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 4 }}>
                    Combat Stats
                  </Typography>
                  <Stack spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography color="text.secondary">Total Kills</Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stats.kills}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography color="text.secondary">Total Deaths</Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stats.deaths}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography color="text.secondary">Victories</Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stats.wins}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography color="text.secondary">Defeats</Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stats.losses}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography color="text.secondary">Best Kill Streak</Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stats.longestKillStreak}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography color="text.secondary">Total Playtime</Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stats.playtime}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 4 }}>
                    Recent Matches
                  </Typography>
                  <Stack spacing={2}>
                    {recentMatches.map((match, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'secondary.main',
                          opacity: 0.5,
                          '&:hover': {
                            opacity: 0.7,
                          },
                          transition: 'opacity 0.3s',
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {match.map}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                              <Chip label={match.mode} size="small" variant="outlined" />
                              <Typography variant="body2" color="text.secondary">
                                {match.date}
                              </Typography>
                            </Stack>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Chip
                              label={match.result}
                              color={match.result === 'Victory' ? 'primary' : 'error'}
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {match.score}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
