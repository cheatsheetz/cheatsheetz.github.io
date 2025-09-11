import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about CheatSheetz - the comprehensive collection of developer reference guides'
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-dracula-green to-dracula-bg-secondary text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">About CheatSheetz</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Comprehensive developer reference collection built by developers, for developers
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dracula-text mb-6">Our Mission</h2>
              <p className="text-dracula-text-secondary mb-4">
                We believe developers should spend more time building and less time searching for documentation.
              </p>
              <p className="text-dracula-text-secondary">
                CheatSheetz provides quick, accessible reference materials for the tools you use every day - 
                saving you time and keeping you in the flow state.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
                <div className="text-2xl font-bold text-dracula-purple">225+</div>
                <div className="text-dracula-text-secondary">Cheat Sheets</div>
              </div>
              <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
                <div className="text-2xl font-bold text-dracula-green">9</div>
                <div className="text-dracula-text-secondary">Categories</div>
              </div>
              <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
                <div className="text-2xl font-bold text-dracula-cyan">100%</div>
                <div className="text-dracula-text-secondary">Open Source</div>
              </div>
              <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
                <div className="text-2xl font-bold text-dracula-orange">MIT</div>
                <div className="text-dracula-text-secondary">License</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-dracula-bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dracula-text text-center mb-12">What Makes CheatSheetz Different</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="font-semibold text-dracula-text mb-3">Always Up to Date</h3>
              <p className="text-dracula-text-secondary text-sm">Automated system keeps cheat sheets synchronized with latest versions</p>
            </div>

            <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-semibold text-dracula-text mb-3">Easy Discovery</h3>
              <p className="text-dracula-text-secondary text-sm">Smart search and category-based organization</p>
            </div>

            <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-semibold text-dracula-text mb-3">Multi-Platform</h3>
              <p className="text-dracula-text-secondary text-sm">Web, CLI, and mobile-friendly interfaces</p>
            </div>

            <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">💝</div>
              <h3 className="font-semibold text-dracula-text mb-3">Free Forever</h3>
              <p className="text-dracula-text-secondary text-sm">No subscriptions, no ads, just free developer resources</p>
            </div>

            <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold text-dracula-text mb-3">Community Driven</h3>
              <p className="text-dracula-text-secondary text-sm">Built by developers, contributions welcome</p>
            </div>

            <div className="text-center bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-dracula-text mb-3">Lightning Fast</h3>
              <p className="text-dracula-text-secondary text-sm">Optimized for speed and performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dracula-text mb-12">Get Involved</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">➕</div>
              <h3 className="font-semibold text-dracula-text mb-3">Add Cheat Sheet</h3>
              <p className="text-dracula-text-secondary text-sm mb-4">Create new cheat sheets for missing tools</p>
              <Link href="https://github.com/cheatsheetz/template" target="_blank" className="btn btn-primary text-sm">
                Use Template
              </Link>
            </div>

            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">✏️</div>
              <h3 className="font-semibold text-dracula-text mb-3">Improve Existing</h3>
              <p className="text-dracula-text-secondary text-sm mb-4">Help improve existing cheat sheets</p>
              <Link href="https://github.com/cheatsheetz" target="_blank" className="btn btn-primary text-sm">
                Browse Repos
              </Link>
            </div>

            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <div className="text-3xl mb-4">🐛</div>
              <h3 className="font-semibold text-dracula-text mb-3">Report Issues</h3>
              <p className="text-dracula-text-secondary text-sm mb-4">Found a problem? Let us know!</p>
              <Link href="https://github.com/cheatsheetz/community" target="_blank" className="btn btn-primary text-sm">
                Report Issue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}