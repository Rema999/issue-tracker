import { Environment, Store, RecordSource } from 'relay-runtime'
import { network } from './network'

// Singleton on the client; fresh instance per request on the server.
let clientEnvironment: Environment | undefined

export function createEnvironment(): Environment {
  return new Environment({
    network,
    store: new Store(new RecordSource(), {
      // Keep unused records in the store for 5 minutes before GC.
      gcReleaseBufferSize: 10,
    }),
    // Useful for debugging in development
    isServer: false,
  })
}

export function getEnvironment(): Environment {
  if (typeof window === 'undefined') {
    // Server: always create a fresh environment to avoid cross-request data leaks.
    return createEnvironment()
  }
  if (!clientEnvironment) {
    clientEnvironment = createEnvironment()
  }
  return clientEnvironment
}
