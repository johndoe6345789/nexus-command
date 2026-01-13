import { describe, it, expect } from 'vitest'
import { filterServers } from '../filterServers'
import { Server } from '@/types'

describe('filterServers', () => {
  const mockServers: Server[] = [
    {
      id: 'server-1',
      name: 'Alpha Squad HQ',
      map: 'Aegis Station',
      players: 12,
      maxPlayers: 24,
      ping: 45,
      mode: 'Team Deathmatch',
      region: 'US East',
    },
    {
      id: 'server-2',
      name: 'Bravo Battalion',
      map: 'Outpost Zero',
      players: 18,
      maxPlayers: 24,
      ping: 32,
      mode: 'Capture the Flag',
      region: 'US West',
    },
    {
      id: 'server-3',
      name: 'Delta Force Arena',
      map: 'Nexus Core',
      players: 8,
      maxPlayers: 24,
      ping: 67,
      mode: 'Domination',
      region: 'EU',
    },
  ]

  it('should filter servers by name (case insensitive)', () => {
    const result = filterServers(mockServers, 'alpha')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alpha Squad HQ')
  })

  it('should filter servers by map (case insensitive)', () => {
    const result = filterServers(mockServers, 'nexus')
    expect(result).toHaveLength(1)
    expect(result[0].map).toBe('Nexus Core')
  })

  it('should return all servers when query is empty', () => {
    const result = filterServers(mockServers, '')
    expect(result).toHaveLength(3)
  })

  it('should return empty array when no matches found', () => {
    const result = filterServers(mockServers, 'nonexistent')
    expect(result).toHaveLength(0)
  })

  it('should handle partial matches in name', () => {
    const result = filterServers(mockServers, 'squad')
    expect(result).toHaveLength(1)
    expect(result[0].name).toContain('Squad')
  })

  it('should handle partial matches in map', () => {
    const result = filterServers(mockServers, 'outpost')
    expect(result).toHaveLength(1)
    expect(result[0].map).toBe('Outpost Zero')
  })

  it('should match servers with name OR map containing query', () => {
    const result = filterServers(mockServers, 'zero')
    expect(result).toHaveLength(1)
    expect(result[0].map).toContain('Zero')
  })

  it('should handle uppercase queries', () => {
    const result = filterServers(mockServers, 'BRAVO')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Bravo Battalion')
  })

  it('should handle mixed case queries', () => {
    const result = filterServers(mockServers, 'DeLtA')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Delta Force Arena')
  })

  it('should return empty array when filtering empty server list', () => {
    const result = filterServers([], 'test')
    expect(result).toHaveLength(0)
  })
})
