import Fuse from 'fuse.js'
import { CheatSheet, SearchResult } from '@/types'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'readme', weight: 0.1 }
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
}

export class CheatSheetSearch {
  private fuse: Fuse<CheatSheet>

  constructor(cheatSheets: CheatSheet[]) {
    this.fuse = new Fuse(cheatSheets, fuseOptions)
  }

  search(query: string): SearchResult[] {
    if (!query.trim()) return []
    
    const results = this.fuse.search(query)
    
    return results.map(result => ({
      item: result.item,
      score: result.score || 0,
      matches: result.matches
    }))
  }

  searchByCategory(query: string, category: string): SearchResult[] {
    const results = this.search(query)
    return results.filter(result => result.item.category === category)
  }

  getPopularSearchTerms(): string[] {
    // Could be enhanced with analytics data
    return [
      'git', 'docker', 'python', 'javascript', 'react',
      'kubernetes', 'aws', 'vim', 'bash', 'typescript'
    ]
  }
}

export function createSearchInstance(cheatSheets: CheatSheet[]) {
  return new CheatSheetSearch(cheatSheets)
}