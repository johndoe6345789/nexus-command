'use client'

import { useRouter } from 'next/navigation'
import { PlayerStats } from '@/components/PlayerStats'

export default function ProfilePage() {
  const router = useRouter()

  return <PlayerStats onBack={() => router.push('/')} />
}
