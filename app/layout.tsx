import '../src/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CheatSheetz - Developer Reference Collection',
    template: '%s | CheatSheetz'
  },
  description: 'Comprehensive collection of developer cheat sheets for modern tools and technologies',
  keywords: ['cheat sheets', 'developer', 'reference', 'programming', 'documentation'],
  authors: [{ name: 'CheatSheetz Team' }],
  creator: 'CheatSheetz Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cheatsheetz.github.io',
    title: 'CheatSheetz - Developer Reference Collection', 
    description: 'Comprehensive collection of developer cheat sheets for modern tools and technologies',
    siteName: 'CheatSheetz'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CheatSheetz - Developer Reference Collection',
    description: 'Comprehensive collection of developer cheat sheets for modern tools and technologies'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Header />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}