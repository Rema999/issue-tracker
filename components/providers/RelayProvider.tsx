'use client'

import { useMemo } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { getEnvironment } from '@/lib/relay/environment'

export function RelayProvider({ children }: { children: React.ReactNode }) {
  // getEnvironment() returns the singleton on the client, so this is stable.
  const environment = useMemo(() => getEnvironment(), [])

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  )
}
