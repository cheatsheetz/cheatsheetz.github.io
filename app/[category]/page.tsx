import { notFound } from 'next/navigation'

const categories = {
  'languages': { title: 'Programming Languages', icon: '💻' },
  'frameworks': { title: 'Web Frameworks', icon: '🚀' },
  'tools': { title: 'Development Tools', icon: '🔧' },
  'devops': { title: 'DevOps & Infrastructure', icon: '☁️' },
  'databases': { title: 'Databases', icon: '🗄️' },
  'mobile': { title: 'Mobile Development', icon: '📱' },
  'testing': { title: 'Testing & Security', icon: '🛡️' },
  'design': { title: 'Design & Styling', icon: '🎨' }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category,
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryInfo = categories[params.category as keyof typeof categories]
  
  if (!categoryInfo) {
    notFound()
  }

  // Mock data for now
  const sheets = [
    { name: 'Git', slug: 'git', description: 'Version control commands', difficulty: 'beginner', tags: ['vcs', 'git'] },
    { name: 'Docker', slug: 'docker', description: 'Container management', difficulty: 'intermediate', tags: ['containers', 'devops'] }
  ]

  return (
    <div className="min-h-screen py-16">
      {/* Category Header */}
      <section className="py-16 bg-gradient-to-br from-dracula-purple to-dracula-bg-secondary text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-4xl mb-4">{categoryInfo.icon}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{categoryInfo.title}</h1>
          <p className="text-xl text-white/80">
            Essential {categoryInfo.title.toLowerCase()} references and cheat sheets
          </p>
          <p className="text-white/70 mt-2">{sheets.length} cheat sheets available</p>
        </div>
      </section>

      {/* Cheat Sheets Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sheets.map((sheet) => (
              <div key={sheet.slug} className="bg-dracula-bg border border-dracula-bg-secondary rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-dracula-text">{sheet.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${
                    sheet.difficulty === 'beginner' ? 'bg-dracula-green' :
                    sheet.difficulty === 'intermediate' ? 'bg-dracula-orange' : 'bg-dracula-red'
                  }`}>
                    {sheet.difficulty}
                  </span>
                </div>
                <p className="text-dracula-text-secondary mb-4">{sheet.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {sheet.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-dracula-bg-secondary text-dracula-text rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}