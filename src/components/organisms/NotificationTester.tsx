import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { addAlert, unlockAchievement, incrementAchievementProgress } from '@/utils/notifications'
import { toast } from 'sonner'

export function NotificationTester() {
  const handleTestInfoAlert = async () => {
    await addAlert('info', 'System Update', 'New features are now available in the developer tools.')
    toast.success('Info alert added')
  }

  const handleTestSuccessAlert = async () => {
    await addAlert('success', 'Match Complete', 'You won the match with 25 kills and 3 deaths!')
    toast.success('Success alert added')
  }

  const handleTestWarningAlert = async () => {
    await addAlert('warning', 'Connection Unstable', 'Your network connection is experiencing high latency.')
    toast.success('Warning alert added')
  }

  const handleTestErrorAlert = async () => {
    await addAlert('error', 'Failed to Join Server', 'The server you tried to join is currently full.')
    toast.success('Error alert added')
  }

  const handleUnlockAchievement = async () => {
    await unlockAchievement('first-blood')
    toast.success('Achievement unlocked!')
  }

  const handleProgressAchievement = async () => {
    await incrementAchievementProgress('sharpshooter', 5)
    toast.success('Achievement progress updated')
  }

  return (
    <Card className="bg-[oklch(0.15_0.02_250)] border-[oklch(0.25_0.04_250)]">
      <CardHeader>
        <CardTitle className="font-heading text-[oklch(0.98_0.01_250)]">
          Notification Tester
        </CardTitle>
        <CardDescription className="text-[oklch(0.70_0.03_250)]">
          Test alerts and achievements system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[oklch(0.85_0.03_250)]">Test Alerts</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleTestInfoAlert} variant="outline" size="sm">
              Info Alert
            </Button>
            <Button onClick={handleTestSuccessAlert} variant="outline" size="sm">
              Success Alert
            </Button>
            <Button onClick={handleTestWarningAlert} variant="outline" size="sm">
              Warning Alert
            </Button>
            <Button onClick={handleTestErrorAlert} variant="outline" size="sm">
              Error Alert
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[oklch(0.85_0.03_250)]">Test Achievements</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleUnlockAchievement} variant="outline" size="sm">
              Unlock First Blood
            </Button>
            <Button onClick={handleProgressAchievement} variant="outline" size="sm">
              +5 Sharpshooter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
