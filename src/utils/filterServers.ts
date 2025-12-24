import { Server } from '@/types'

export function filterServers(servers: Server[], query: string): Server[] {
  return servers.filter(
    (server) =>
      server.name.toLowerCase().includes(query.toLowerCase()) ||
      server.map.toLowerCase().includes(query.toLowerCase())
  )
}
