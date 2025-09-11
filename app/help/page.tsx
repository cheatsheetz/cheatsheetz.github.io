import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Help',
  description: 'Help documentation and frequently asked questions for CheatSheetz'
}

export default function HelpPage() {
  return (
    <div className="min-h-screen py-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-dracula-cyan to-dracula-bg-secondary text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Help & Support</h1>
          <p className="text-xl text-white/80">
            Everything you need to know about using CheatSheetz
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dracula-text mb-12 text-center">Quick Start Guide</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-dracula-purple rounded-full flex items-center justify-center text-2xl">🌐</div>
              <h3 className="font-semibold text-dracula-text mb-2">Browse Web</h3>
              <p className="text-dracula-text-secondary text-sm">Navigate categories, click any cheat sheet to view content</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-dracula-green rounded-full flex items-center justify-center text-2xl">🔍</div>
              <h3 className="font-semibold text-dracula-text mb-2">Search</h3>
              <p className="text-dracula-text-secondary text-sm">Use the search box to find specific tools or topics</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-dracula-cyan rounded-full flex items-center justify-center text-2xl">💻</div>
              <h3 className="font-semibold text-dracula-text mb-2">Use CLI</h3>
              <p className="text-dracula-text-secondary text-sm">
                <Link href="/cli" className="text-dracula-cyan hover:underline">Install CLI tool</Link> for terminal access
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-dracula-orange rounded-full flex items-center justify-center text-2xl">🖨️</div>
              <h3 className="font-semibold text-dracula-text mb-2">Print</h3>
              <p className="text-dracula-text-secondary text-sm">Every page is print-optimized for physical copies</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-dracula-bg-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dracula-text mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-dracula-text mb-3">How often are cheat sheets updated?</h3>
              <p className="text-dracula-text-secondary">CheatSheetz automatically updates twice daily and whenever changes are pushed to repositories.</p>
            </div>

            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-dracula-text mb-3">Can I contribute my own cheat sheet?</h3>
              <p className="text-dracula-text-secondary">
                Yes! Visit our{' '}
                <Link href="https://github.com/cheatsheetz/template" target="_blank" className="text-dracula-cyan hover:underline">
                  template repository
                </Link>{' '}
                to create a new cheat sheet.
              </p>
            </div>

            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-dracula-text mb-3">How do I report errors?</h3>
              <p className="text-dracula-text-secondary">
                Use our{' '}
                <Link href="https://github.com/cheatsheetz/community" target="_blank" className="text-dracula-cyan hover:underline">
                  community repository
                </Link>{' '}
                for issues, requests, and discussions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}