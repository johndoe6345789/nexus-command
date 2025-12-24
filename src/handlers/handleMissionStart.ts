import { toast } from 'sonner'

export function handleMissionStart(selectedMap: string | null, onLoadingChange: (loading: boolean) => void): void {
  if (!selectedMap) {
    toast.error('Select a map to continue')
    return
  }
  onLoadingChange(true)
  toast.success('Initializing combat simulation...')
  setTimeout(() => {
    onLoadingChange(false)
    toast.success('Mission started!')
  }, 2000)
}
