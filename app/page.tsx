'use client'

import dynamic from 'next/dynamic'
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from '@/ErrorFallback'

// Import App with no SSR to avoid window references
const App = dynamic(() => import('@/App'), { ssr: false })

export default function Home() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  )
}
