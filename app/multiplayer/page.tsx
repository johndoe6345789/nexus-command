'use client'

import { useRouter } from 'next/navigation'
import { Multiplayer } from '@/components/Multiplayer'

export default function MultiplayerPage() {
  const router = useRouter()

  return <Multiplayer onBack={() => router.push('/')} />
}
