import { Server } from '@/types'
import { generateServers } from '@/utils'

export function handleServerRefresh(
  onLoadingChange: (loading: boolean) => void,
  onServersChange: (servers: Server[]) => void
): void {
  onLoadingChange(true)
  setTimeout(() => {
    onServersChange(generateServers())
    onLoadingChange(false)
  }, 1000)
}
