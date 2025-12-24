import { Server } from '@/types'

export function generateServers(): Server[] {
  const serverNames = [
    'Alpha Squad HQ',
    'Bravo Battalion',
    'Delta Force Arena',
    'Echo Combat Zone',
    'Foxtrot Stronghold',
    'Ghost Division',
  ]
  
  const maps = ['Aegis Station', 'Outpost Zero', 'Nexus Core', 'Meridian City']
  const modes = ['Team Deathmatch', 'Capture the Flag', 'Domination']
  const regions = ['US East', 'US West', 'EU', 'Asia']

  return serverNames.map((name, i) => ({
    id: `server-${i}`,
    name,
    map: maps[Math.floor(Math.random() * maps.length)],
    players: Math.floor(Math.random() * 20) + 5,
    maxPlayers: 24,
    ping: Math.floor(Math.random() * 80) + 20,
    mode: modes[Math.floor(Math.random() * modes.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
  }))
}
