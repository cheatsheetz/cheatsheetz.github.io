import { GitHubRepo, GitHubReadme, CheatSheet, Category } from '@/types'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN
const ORG_NAME = 'cheatsheetz'
const EXCLUDED_REPOS = [
  'cheatsheetz.github.io', // This website
  '.github',              // Organization meta files
  'template',             // Template files (.github/ISSUE_TEMPLATE, NEW_CHEATSHEET.md, etc)
  'community',            // Community hub (issues, new cheat requests, discussions)
  'cli',                  // CLI tool (separate application from cheat sheets)
  'android',              // Android app (separate application from cheat sheets)
  'docs',                 // Documentation repository
  'profile',              // GitHub profile README
  'assets',               // Static assets repository
  'config'                // Configuration files
]

// Category detection patterns
const CATEGORY_PATTERNS = {
  languages: {
    patterns: ['python', 'java', 'javascript', 'typescript', 'go', 'rust', 'swift', 'php', 'ruby', 'cpp', 'csharp', 'kotlin'],
    topics: ['language', 'programming-language'],
    title: 'Programming Languages',
    icon: '💻',
    color: '#bd93f9',
    priority: 10
  },
  frameworks: {
    patterns: ['react', 'vue', 'angular', 'svelte', 'django', 'flask', 'rails', 'express', 'nextjs', 'nuxt'],
    topics: ['framework', 'web-framework'],
    title: 'Web Frameworks', 
    icon: '🚀',
    color: '#50fa7b',
    priority: 9
  },
  tools: {
    patterns: ['git', 'vim', 'vscode', 'tmux', 'bash', 'webpack', 'vite', 'parcel'],
    topics: ['tool', 'cli', 'editor'],
    title: 'Development Tools',
    icon: '🔧',
    color: '#8be9fd',
    priority: 8
  },
  devops: {
    patterns: ['docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'aws', 'azure', 'gcp'],
    topics: ['devops', 'infrastructure', 'cloud'],
    title: 'DevOps & Infrastructure',
    icon: '☁️',
    color: '#ffb86c',
    priority: 7
  },
  databases: {
    patterns: ['mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch'],
    topics: ['database', 'sql', 'nosql'],
    title: 'Databases',
    icon: '🗄️',
    color: '#ff5555',
    priority: 6
  },
  mobile: {
    patterns: ['ios', 'android', 'flutter', 'react-native', 'ionic'],
    topics: ['mobile', 'ios', 'android'],
    title: 'Mobile Development',
    icon: '📱',
    color: '#bd93f9',
    priority: 5
  },
  testing: {
    patterns: ['jest', 'pytest', 'cypress', 'selenium', 'junit'],
    topics: ['testing', 'test', 'qa'],
    title: 'Testing & Security',
    icon: '🛡️',
    color: '#50fa7b',
    priority: 4
  },
  design: {
    patterns: ['figma', 'sketch', 'tailwind', 'bootstrap', 'css'],
    topics: ['design', 'ui', 'css'],
    title: 'Design & Styling',
    icon: '🎨',
    color: '#8be9fd',
    priority: 3
  }
}

class GitHubFetcher {
  private headers: Record<string, string>

  constructor() {
    this.headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'CheatSheetz-NextJS',
      'X-GitHub-Api-Version': '2022-11-28'
    }
    
    if (GITHUB_TOKEN) {
      this.headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
    }
  }

  async fetchAllRepositories(): Promise<GitHubRepo[]> {
    const repos: GitHubRepo[] = []
    let page = 1
    const perPage = 100

    try {
      while (true) {
        const response = await fetch(
          `https://api.github.com/orgs/${ORG_NAME}/repos?per_page=${perPage}&page=${page}&sort=name`,
          { headers: this.headers }
        )

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const pageRepos: GitHubRepo[] = await response.json()
        
        if (pageRepos.length === 0) break
        
        repos.push(...pageRepos)
        
        if (pageRepos.length < perPage) break
        page++

        // Rate limiting courtesy
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Filter excluded repositories
      return repos.filter(repo => 
        !EXCLUDED_REPOS.includes(repo.name.toLowerCase()) &&
        !repo.archived &&
        !repo.disabled &&
        !repo.private &&
        !repo.fork
      )

    } catch (error) {
      console.error('Failed to fetch repositories:', error)
      return []
    }
  }

  async fetchReadme(repoName: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${ORG_NAME}/${repoName}/readme`,
        { headers: this.headers }
      )

      if (!response.ok) {
        return `# ${repoName}\n\nNo README available.`
      }

      const data: GitHubReadme = await response.json()
      return Buffer.from(data.content, 'base64').toString('utf-8')
      
    } catch (error) {
      console.warn(`Failed to fetch README for ${repoName}:`, error)
      return `# ${repoName}\n\nNo README available.`
    }
  }

  detectCategory(repo: GitHubRepo, readme: string): string {
    const name = repo.name.toLowerCase()
    const description = (repo.description || '').toLowerCase()
    const topics = repo.topics || []
    const readmePreview = readme.toLowerCase().substring(0, 1000)

    const scores: Record<string, number> = {}

    for (const [categoryKey, categoryData] of Object.entries(CATEGORY_PATTERNS)) {
      let score = 0

      // Check name patterns (highest weight)
      for (const pattern of categoryData.patterns) {
        if (name.includes(pattern)) {
          score += 10
          break
        }
      }

      // Check topics (high weight)
      for (const topic of categoryData.topics) {
        if (topics.includes(topic)) {
          score += 8
        }
      }

      // Check description (medium weight)
      for (const pattern of categoryData.patterns) {
        if (description.includes(pattern)) {
          score += 3
          break
        }
      }

      // Check README content (low weight)
      for (const pattern of categoryData.patterns) {
        if (readmePreview.includes(pattern)) {
          score += 1
          break
        }
      }

      if (score > 0) {
        scores[categoryKey] = score
      }
    }

    if (Object.keys(scores).length === 0) {
      return 'other'
    }

    return Object.entries(scores).sort(([,a], [,b]) => b - a)[0][0]
  }

  async processRepository(repo: GitHubRepo): Promise<CheatSheet> {
    const readme = await this.fetchReadme(repo.name)
    const category = this.detectCategory(repo, readme)

    // Determine difficulty
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
    if (repo.topics.includes('beginner') || readme.toLowerCase().includes('beginner')) {
      difficulty = 'beginner'
    } else if (repo.topics.includes('advanced') || readme.toLowerCase().includes('advanced')) {
      difficulty = 'advanced'
    }

    return {
      name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: repo.name,
      description: repo.description || 'No description available',
      category,
      difficulty,
      tags: repo.topics.length > 0 ? repo.topics : [category],
      readme,
      url: repo.html_url,
      updated_at: repo.updated_at,
      stars: repo.stargazers_count
    }
  }

  async getAllCheatSheets(): Promise<{ cheatSheets: CheatSheet[], categories: Category[] }> {
    console.log('🚀 Fetching all repositories...')
    const repos = await this.fetchAllRepositories()
    console.log(`📦 Found ${repos.length} repositories`)

    const cheatSheets: CheatSheet[] = []
    
    for (const repo of repos) {
      try {
        const sheet = await this.processRepository(repo)
        cheatSheets.push(sheet)
        console.log(`✓ Processed: ${repo.name} -> ${sheet.category}`)
      } catch (error) {
        console.warn(`⚠️ Failed to process ${repo.name}:`, error)
      }
    }

    // Build dynamic categories
    const usedCategories = new Set(cheatSheets.map(sheet => sheet.category))
    const categories: Category[] = []

    for (const categoryKey of Array.from(usedCategories)) {
      const pattern = CATEGORY_PATTERNS[categoryKey as keyof typeof CATEGORY_PATTERNS]
      const count = cheatSheets.filter(sheet => sheet.category === categoryKey).length

      if (pattern) {
        categories.push({
          key: categoryKey,
          title: pattern.title,
          icon: pattern.icon,
          color: pattern.color,
          count
        })
      } else {
        categories.push({
          key: categoryKey,
          title: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
          icon: '📁',
          color: '#6272a4',
          count
        })
      }
    }

    // Sort by priority then alphabetically
    categories.sort((a, b) => {
      const priorityA = CATEGORY_PATTERNS[a.key as keyof typeof CATEGORY_PATTERNS]?.priority || 0
      const priorityB = CATEGORY_PATTERNS[b.key as keyof typeof CATEGORY_PATTERNS]?.priority || 0
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA
      }
      
      return a.title.localeCompare(b.title)
    })

    console.log(`📝 Processed ${cheatSheets.length} sheets, ${categories.length} categories`)

    return {
      cheatSheets: cheatSheets.sort((a, b) => a.name.localeCompare(b.name)),
      categories
    }
  }
}

export const githubFetcher = new GitHubFetcher()
export { CATEGORY_PATTERNS }