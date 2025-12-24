export interface Server {
  id: string
  name: string
  map: string
  players: number
  maxPlayers: number
  ping: number
  mode: string
  region: string
}
