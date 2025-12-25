import { useEffect } from 'react'
import { useKV } from '@/hooks/useKV'
import { addAlert } from '@/utils/notifications'

export function useWelcomeAlerts() {
  const [hasSeenWelcome, setHasSeenWelcome] = useKV<boolean>('has-seen-welcome', false)

  useEffect(() => {
    const showWelcomeAlerts = async () => {
      if (!hasSeenWelcome) {
        await addAlert(
          'info',
          'Welcome to NEXUS COMMAND',
          'Your tactical operations hub is ready. Check the top bar for alerts and achievements.'
        )
        
        setTimeout(async () => {
          await addAlert(
            'success',
            'Systems Online',
            'All combat systems initialized and ready for deployment.'
          )
        }, 1000)

        setTimeout(async () => {
          await addAlert(
            'achievement',
            'First Steps',
            'Begin your journey by exploring the available game modes.'
          )
        }, 2000)

        setHasSeenWelcome(true)
      }
    }

    showWelcomeAlerts()
  }, [hasSeenWelcome, setHasSeenWelcome])
}
