'use client'

import { useRouter } from 'next/navigation'
import { Settings } from '@/components/Settings'

export default function SettingsPage() {
  const router = useRouter()

  return <Settings onBack={() => router.push('/')} />
}
