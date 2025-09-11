import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  // Generate static paths for common sheets
  const paths = [
    { category: 'tools', slug: 'git' },
    { category: 'tools', slug: 'docker' },
    { category: 'languages', slug: 'python' },
    { category: 'languages', slug: 'javascript' },
    { category: 'frameworks', slug: 'react' },
    { category: 'frameworks', slug: 'vue' },
  ]
  
  return paths.map(({ category, slug }) => ({
    category,
    slug,
  }))
}

export default function SheetPage({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  // Mock data for now
  const sheet = {
    name: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
    description: `${params.slug} cheat sheet`,
    category: params.category,
    difficulty: 'intermediate',
    readme: `# ${params.slug}\n\n## Quick Reference\n\nThis is a cheat sheet for ${params.slug}.\n\n### Commands\n\n\`\`\`bash\n# Example command\n${params.slug} --help\n\`\`\``
  }

  if (!sheet) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      {/* Breadcrumb */}
      <div className="bg-dracula-bg-secondary border-b border-dracula-bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="text-sm text-dracula-text-secondary">
            <span>Home</span> / <span className="capitalize">{params.category}</span> / <span className="text-dracula-text">{sheet.name}</span>
          </nav>
        </div>
      </div>

      {/* Sheet Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Meta header */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 bg-dracula-purple text-white rounded-full text-sm font-medium">
              {params.category}
            </span>
            <span className="px-3 py-1 bg-dracula-orange text-white rounded-full text-sm font-medium">
              {sheet.difficulty}
            </span>
            <a 
              href={`https://github.com/cheatsheetz/${params.slug}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 border border-dracula-purple text-dracula-purple hover:bg-dracula-purple hover:text-white rounded-full text-sm transition-colors"
            >
              📁 View Source
            </a>
          </div>

          {/* README Content */}
          <div className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-8">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-dracula-text">{sheet.name}</h1>
              <h2 className="text-dracula-text">Quick Reference</h2>
              <p className="text-dracula-text-secondary">This is a cheat sheet for {params.slug}.</p>
              
              <h3 className="text-dracula-text">Commands</h3>
              <div className="bg-dracula-bg-surface border border-dracula-bg-secondary rounded-lg p-4 overflow-x-auto">
                <pre><code className="text-dracula-text font-mono text-sm">{`# Example command\n${params.slug} --help`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}