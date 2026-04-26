import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // We use .babelrc with babel-plugin-relay, which disables the SWC compiler.
  // This is a known trade-off when integrating Relay with Next.js — documented in README.
  //
  // To keep HMR fast, the Relay compiler runs in watch mode alongside next dev:
  //   Terminal 1: npm run relay:watch
  //   Terminal 2: npm run dev

  // Allow avatar images from external providers
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

export default nextConfig
