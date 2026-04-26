import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Relay artifacts are precompiled and committed to `__generated__`,
    // so the project does not rely on babel-plugin-relay at runtime.
    //
    // During development, Relay artifacts can be refreshed with:
    //   npm run relay
    // or, if watchman is installed:
    //   npm run relay:watch

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

export default nextConfig