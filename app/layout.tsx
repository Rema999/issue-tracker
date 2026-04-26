import type { Metadata } from 'next'
import './globals.css'
import { RelayProvider } from '@/components/providers/RelayProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Minimal issue tracker built with Next.js, Relay, and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        <RelayProvider>
          <ToastProvider>
            {/* Top navigation */}
            <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
              <div className="mx-auto flex h-12 max-w-7xl items-center gap-4 px-6">
                <Link
                  href="/issues"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">
                    IT
                  </span>
                  Issue Tracker
                </Link>
                <nav className="flex items-center gap-1 ml-2">
                  <Link
                    href="/issues"
                    className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Issues
                  </Link>
                </nav>
              </div>
            </header>

            <main className="mx-auto max-w-7xl">{children}</main>
          </ToastProvider>
        </RelayProvider>
      </body>
    </html>
  )
}
