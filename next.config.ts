import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Relay artifacts are precompiled and committed to `__generated__`,
    // so the project does not rely on babel-plugin-relay at runtime.
    //
    // During development, Relay artifacts can be refreshed with:
    //   npm run relay
    // or, if watchman is installed:
    //   npm run relay:watch

  // Explicitly set the Turbopack workspace root to this directory.
  // Without this, Turbopack may pick up a package-lock.json from a parent
  // directory and use that as the root, causing .env.local to be missed.
  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

export default nextConfig