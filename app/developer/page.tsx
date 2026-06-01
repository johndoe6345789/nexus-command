'use client'

import { useRouter } from 'next/navigation'
import { Developer } from '@/components/Developer'

export default function DeveloperPage() {
  const router = useRouter()

  return <Developer onBack={() => router.push('/')} />
}
