import { githubFetcher } from '@/lib/github'
import { HomePage } from '@/components/pages/HomePage'

export default async function Home() {
  try {
    const { cheatSheets, categories } = await githubFetcher.getAllCheatSheets()
    
    return (
      <HomePage 
        cheatSheets={cheatSheets}
        categories={categories}
      />
    )
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error)
    
    // Fallback to minimal static data if API fails
    const fallbackCategories = [
      { key: 'tools', title: 'Development Tools', icon: '🔧', color: '#8be9fd', count: 0 }
    ]
    const fallbackSheets: any[] = []
    
    return (
      <HomePage 
        cheatSheets={fallbackSheets}
        categories={fallbackCategories}
      />
    )
  }
}

export const revalidate = 43200 // 12 hours