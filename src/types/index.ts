import type { FuseResultMatch } from 'fuse.js'

export interface Repository {
  name: string
  slug: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  readme: string
  url: string
  updated_at: string
  stars: number
}

export interface Category {
  key: string
  title: string
  icon: string
  color: string
  count: number
}

export interface CheatSheet extends Repository {}

export interface SearchResult {
  item: CheatSheet
  score: number
  matches?: readonly FuseResultMatch[]
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  updated_at: string
  stargazers_count: number
  topics: string[]
  archived: boolean
  disabled: boolean
  private: boolean
  fork: boolean
}

export interface GitHubReadme {
  content: string
  encoding: string
}

export interface BuildData {
  cheatSheets: CheatSheet[]
  categories: Category[]
  lastUpdate: string
  totalCount: number
}