'use client'

import { useRouter } from 'next/navigation'
import { SinglePlayer } from '@/components/SinglePlayer'

export default function CampaignPage() {
  const router = useRouter()

  return <SinglePlayer onBack={() => router.push('/')} />
}
