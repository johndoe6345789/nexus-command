export function handleMissionStart(selectedMap: string | null, onLoadingChange: (loading: boolean) => void): void {
  if (!selectedMap) {
    return
  }
  onLoadingChange(true)
  setTimeout(() => {
    onLoadingChange(false)
  }, 2000)
}
