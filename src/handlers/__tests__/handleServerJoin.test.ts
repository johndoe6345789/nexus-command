import { describe, expect, it } from 'vitest'
import { handleServerJoin } from '../handleServerJoin'

describe('handleServerJoin', () => {
  it('returns early when no server is selected', () => {
    expect(handleServerJoin(null)).toBeUndefined()
  })

  it('returns when a server is selected', () => {
    expect(handleServerJoin('alpha')).toBeUndefined()
  })
})
