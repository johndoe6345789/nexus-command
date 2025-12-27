import { describe, it, expect } from 'vitest'
import { generateServers } from '../generateServers'

describe('generateServers', () => {
  it('should generate 6 servers', () => {
    const servers = generateServers()
    expect(servers).toHaveLength(6)
  })

  it('should generate servers with required fields', () => {
    const servers = generateServers()
    
    servers.forEach((server) => {
      expect(server).toHaveProperty('id')
      expect(server).toHaveProperty('name')
      expect(server).toHaveProperty('map')
      expect(server).toHaveProperty('players')
      expect(server).toHaveProperty('maxPlayers')
      expect(server).toHaveProperty('ping')
      expect(server).toHaveProperty('mode')
      expect(server).toHaveProperty('region')
    })
  })

  it('should generate servers with unique IDs', () => {
    const servers = generateServers()
    const ids = servers.map((s) => s.id)
    const uniqueIds = new Set(ids)
    
    expect(uniqueIds.size).toBe(6)
  })

  it('should generate servers with expected names', () => {
    const servers = generateServers()
    const expectedNames = [
      'Alpha Squad HQ',
      'Bravo Battalion',
      'Delta Force Arena',
      'Echo Combat Zone',
      'Foxtrot Stronghold',
      'Ghost Division',
    ]
    
    const names = servers.map((s) => s.name)
    expect(names).toEqual(expectedNames)
  })

  it('should set maxPlayers to 24 for all servers', () => {
    const servers = generateServers()
    
    servers.forEach((server) => {
      expect(server.maxPlayers).toBe(24)
    })
  })

  it('should generate players count within valid range', () => {
    const servers = generateServers()
    
    servers.forEach((server) => {
      expect(server.players).toBeGreaterThanOrEqual(5)
      expect(server.players).toBeLessThanOrEqual(24)
    })
  })

  it('should generate ping within valid range', () => {
    const servers = generateServers()
    
    servers.forEach((server) => {
      expect(server.ping).toBeGreaterThanOrEqual(20)
      expect(server.ping).toBeLessThanOrEqual(99)
    })
  })

  it('should assign valid maps to servers', () => {
    const servers = generateServers()
    const validMaps = ['Aegis Station', 'Outpost Zero', 'Nexus Core', 'Meridian City']
    
    servers.forEach((server) => {
      expect(validMaps).toContain(server.map)
    })
  })

  it('should assign valid game modes to servers', () => {
    const servers = generateServers()
    const validModes = ['Team Deathmatch', 'Capture the Flag', 'Domination']
    
    servers.forEach((server) => {
      expect(validModes).toContain(server.mode)
    })
  })

  it('should assign valid regions to servers', () => {
    const servers = generateServers()
    const validRegions = ['US East', 'US West', 'EU', 'Asia']
    
    servers.forEach((server) => {
      expect(validRegions).toContain(server.region)
    })
  })

  it('should generate IDs in correct format', () => {
    const servers = generateServers()
    
    servers.forEach((server, index) => {
      expect(server.id).toBe(`server-${index}`)
    })
  })

  it('should generate different random values on multiple calls', () => {
    const servers1 = generateServers()
    const servers2 = generateServers()
    
    // At least some servers should have different players, ping, or map
    const allSame = servers1.every((s1, i) => {
      const s2 = servers2[i]
      return s1.players === s2.players && s1.ping === s2.ping && s1.map === s2.map
    })
    
    // It's extremely unlikely all random values would be identical
    expect(allSame).toBe(false)
  })
})
