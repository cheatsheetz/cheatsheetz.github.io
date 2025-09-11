import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-dracula-purple mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-dracula-text mb-6">Page Not Found</h2>
        <p className="text-dracula-text-secondary mb-8">
          The cheat sheet or page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            🏠 Go Home
          </Link>
          <Link 
            href="https://github.com/cheatsheetz" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            📁 Browse GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}