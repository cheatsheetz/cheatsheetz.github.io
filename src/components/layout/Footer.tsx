import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--bg-surface)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              CheatSheetz
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Comprehensive developer cheat sheets for modern tools and technologies.
            </p>
            <Link
              href="https://github.com/cheatsheetz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-info)] hover:text-[var(--accent-primary)] transition-colors"
            >
              📁 GitHub Organization
            </Link>
          </div>

          <div>
            <h4 className="text-md font-semibold text-[var(--text-primary)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent-primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cli" className="hover:text-[var(--accent-primary)] transition-colors">
                  CLI Tool
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-[var(--accent-primary)] transition-colors">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent-primary)] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-[var(--text-primary)] mb-4">
              Contribute
            </h4>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>
                <Link
                  href="https://github.com/cheatsheetz/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  Request New Cheat Sheet
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cheatsheetz/template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  Use Template
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cheatsheetz/cheatsheetz.github.io/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--bg-surface)] mt-8 pt-8 text-center text-[var(--text-secondary)]">
          <p>&copy; 2024 CheatSheetz. MIT License - Your code, Your rules.</p>
          <p className="text-xs mt-2">
            Third-party dependencies subject to their respective licenses.
          </p>
        </div>
      </div>
    </footer>
  )
}