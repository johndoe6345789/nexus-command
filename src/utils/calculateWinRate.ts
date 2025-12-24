export function calculateWinRate(wins: number, losses: number): string {
  return ((wins / (wins + losses)) * 100).toFixed(1)
}
