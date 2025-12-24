import { toast } from 'sonner'

export function handleServerJoin(selectedServer: string | null): void {
  if (!selectedServer) {
    toast.error('Select a server to join')
    return
  }
  toast.success('Connecting to server...')
  setTimeout(() => {
    toast.success('Connection established!')
  }, 1500)
}
