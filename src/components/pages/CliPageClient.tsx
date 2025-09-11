'use client'

import { useState } from 'react'

export function CliPageClient() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const macosCommand = 'curl -sSL https://github.com/cheatsheetz/cli/releases/latest/download/cheatsheetz-macos | sudo tee /usr/local/bin/cheatsheetz > /dev/null && sudo chmod +x /usr/local/bin/cheatsheetz'
  const linuxCommand = 'curl -sSL https://github.com/cheatsheetz/cli/releases/latest/download/cheatsheetz-linux | sudo tee /usr/local/bin/cheatsheetz > /dev/null && sudo chmod +x /usr/local/bin/cheatsheetz'
  const windowsCommand = 'Invoke-WebRequest -Uri https://github.com/cheatsheetz/cli/releases/latest/download/cheatsheetz-windows.exe -OutFile cheatsheetz.exe'

  return (
    <div className="min-h-screen py-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-dracula-purple to-dracula-bg-secondary text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-4xl mb-6">⚡</div>
          <h1 className="text-4xl font-bold text-white mb-4">CheatSheetz CLI</h1>
          <p className="text-xl text-white/80 mb-8">
            Access developer cheat sheets from your terminal
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">v1.0.0</div>
              <div className="text-white/70">Latest Version</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-white/70">Platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Install */}
      <section className="py-16 bg-dracula-bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dracula-text text-center mb-12">Quick Install</h2>
          
          <div className="space-y-8">
            {/* macOS */}
            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-dracula-text mb-4 flex items-center gap-2">
                🍎 macOS
              </h3>
              <div className="relative">
                <div className="bg-dracula-bg-surface border border-dracula-purple/20 rounded-lg p-3 overflow-x-scroll w-full">
                  <pre className="m-0 p-0 text-dracula-text font-mono text-xs whitespace-nowrap w-max">
                    {macosCommand}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(macosCommand, 'macos')}
                  className="absolute top-2 right-2 bg-dracula-purple text-white p-1.5 rounded text-xs hover:bg-dracula-cyan transition-colors"
                >
                  {copiedId === 'macos' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            {/* Linux */}
            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-dracula-text mb-4 flex items-center gap-2">
                🐧 Linux  
              </h3>
              <div className="relative">
                <div className="bg-dracula-bg-surface border border-dracula-purple/20 rounded-lg p-3 overflow-x-scroll w-full">
                  <pre className="m-0 p-0 text-dracula-text font-mono text-xs whitespace-nowrap w-max">
                    {linuxCommand}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(linuxCommand, 'linux')}
                  className="absolute top-2 right-2 bg-dracula-purple text-white p-1.5 rounded text-xs hover:bg-dracula-cyan transition-colors"
                >
                  {copiedId === 'linux' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            {/* Windows */}
            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-dracula-text mb-4 flex items-center gap-2">
                🪟 Windows
              </h3>
              <div className="relative">
                <div className="bg-dracula-bg-surface border border-dracula-purple/20 rounded-lg p-3 overflow-x-scroll w-full">
                  <pre className="m-0 p-0 text-dracula-text font-mono text-xs whitespace-nowrap w-max">
                    {windowsCommand}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(windowsCommand, 'windows')}
                  className="absolute top-2 right-2 bg-dracula-purple text-white p-1.5 rounded text-xs hover:bg-dracula-cyan transition-colors"
                >
                  {copiedId === 'windows' ? '✓' : '📋'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dracula-text text-center mb-12">Usage Examples</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-dracula-text mb-3">List All Cheat Sheets</h3>
              <div className="bg-dracula-bg-surface rounded-lg p-3">
                <code className="text-dracula-text font-mono text-sm">cheatsheetz list</code>
              </div>
              <p className="text-dracula-text-secondary text-sm mt-3">Shows all available cheat sheets organized by category</p>
            </div>

            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-dracula-text mb-3">Search Tool</h3>
              <div className="bg-dracula-bg-surface rounded-lg p-3">
                <code className="text-dracula-text font-mono text-sm">cheatsheetz search docker</code>
              </div>
              <p className="text-dracula-text-secondary text-sm mt-3">Find cheat sheets related to Docker</p>
            </div>

            <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6">
              <h3 className="font-semibold text-dracula-text mb-3">View Cheat Sheet</h3>
              <div className="bg-dracula-bg-surface rounded-lg p-3">
                <code className="text-dracula-text font-mono text-sm">cheatsheetz show git</code>
              </div>
              <p className="text-dracula-text-secondary text-sm mt-3">Display the Git cheat sheet in your terminal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}