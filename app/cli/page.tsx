import { Metadata } from 'next'
import { CliPageClient } from '@/components/pages/CliPageClient'

export const metadata: Metadata = {
  title: 'CLI Tool',
  description: 'CheatSheetz command line tool for terminal access to developer cheat sheets'
}

export default function CliPage() {
  return <CliPageClient />
}