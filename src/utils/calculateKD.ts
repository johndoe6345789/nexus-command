export function calculateKD(kills: number, deaths: number): string {
  return (kills / deaths).toFixed(2)
}
