import { Button, Paper, Typography, Stack } from '@mui/material'
import { addAlert, unlockAchievement, incrementAchievementProgress } from '@/utils/notifications'

export function NotificationTester() {
  const handleTestInfoAlert = async () => {
    await addAlert('info', 'System Update', 'New features are now available in the developer tools.')
  }

  const handleTestSuccessAlert = async () => {
    await addAlert('success', 'Match Complete', 'You won the match with 25 kills and 3 deaths!')
  }

  const handleTestWarningAlert = async () => {
    await addAlert('warning', 'Connection Unstable', 'Your network connection is experiencing high latency.')
  }

  const handleTestErrorAlert = async () => {
    await addAlert('error', 'Failed to Join Server', 'The server you tried to join is currently full.')
  }

  const handleUnlockAchievement = async () => {
    await unlockAchievement('first-blood')
  }

  const handleProgressAchievement = async () => {
    await incrementAchievementProgress('sharpshooter', 5)
  }

  return (
    <Paper sx={{ bgcolor: 'oklch(0.15 0.02 250)', borderColor: 'oklch(0.25 0.04 250)', p: 3 }}>
      <Typography variant="h6" className="font-heading" sx={{ color: 'oklch(0.98 0.01 250)', mb: 1 }}>
        Notification Tester
      </Typography>
      <Typography variant="body2" sx={{ color: 'oklch(0.70 0.03 250)', mb: 3 }}>
        Test alerts and achievements system
      </Typography>
      <Stack spacing={2}>
        <div>
          <Typography variant="subtitle2" sx={{ color: 'oklch(0.85 0.03 250)', mb: 1 }}>Test Alerts</Typography>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleTestInfoAlert} variant="outlined" size="small">
              Info Alert
            </Button>
            <Button onClick={handleTestSuccessAlert} variant="outlined" size="small">
              Success Alert
            </Button>
            <Button onClick={handleTestWarningAlert} variant="outlined" size="small">
              Warning Alert
            </Button>
            <Button onClick={handleTestErrorAlert} variant="outlined" size="small">
              Error Alert
            </Button>
          </div>
        </div>

        <div>
          <Typography variant="subtitle2" sx={{ color: 'oklch(0.85 0.03 250)', mb: 1 }}>Test Achievements</Typography>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleUnlockAchievement} variant="outlined" size="small">
              Unlock First Blood
            </Button>
            <Button onClick={handleProgressAchievement} variant="outlined" size="small">
              +5 Sharpshooter
            </Button>
          </div>
        </div>
      </Stack>
    </Paper>
  )
}
