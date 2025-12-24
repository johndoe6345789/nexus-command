import { toast } from 'sonner'
import { Server } from '@/types'
import { generateServers } from '@/utils'

export function handleServerRefresh(
  onLoadingChange: (loading: boolean) => void,
  onServersChange: (servers: Server[]) => void
): void {
  onLoadingChange(true)
  toast.info('Refreshing server list...')
  setTimeout(() => {
    onServersChange(generateServers())
    onLoadingChange(false)
    toast.success('Servers updated')
  }, 1000)
}
