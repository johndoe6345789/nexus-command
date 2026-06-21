import { useEffect } from 'react'
import { DEPLOY_VERSION } from '@/constants'

const pollIntervalMs = 60_000

function getVersionUrl() {
  const nextScript = document.querySelector<HTMLScriptElement>('script[src*="/_next/"]')
  const scriptSrc = nextScript?.getAttribute('src') ?? ''
  const basePath = scriptSrc.includes('/_next/')
    ? scriptSrc.slice(0, scriptSrc.indexOf('/_next/'))
    : ''

  return `${basePath}/version.json?poll=${Date.now()}`
}

export function useDeployedVersionRefresh() {
  useEffect(() => {
    let isChecking = false

    const checkVersion = async () => {
      if (isChecking) return
      isChecking = true

      try {
        const response = await fetch(getVersionUrl(), {
          cache: 'no-store',
          headers: { accept: 'application/json' },
        })

        if (!response.ok) return

        const deployed = await response.json() as { version?: unknown }
        if (typeof deployed.version === 'string' && deployed.version !== DEPLOY_VERSION) {
          window.location.reload()
        }
      } catch {
        // A transient network failure should not disrupt the active session.
      } finally {
        isChecking = false
      }
    }

    void checkVersion()
    const intervalId = window.setInterval(checkVersion, pollIntervalMs)

    return () => window.clearInterval(intervalId)
  }, [])
}
