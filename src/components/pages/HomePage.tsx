'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheatSheet, Category, SearchResult } from '@/types'
import { createSearchInstance } from '@/lib/search'
import { SearchInput } from '@/components/search/SearchInput'
import { CategoryCard } from '@/components/cheatsheet/CategoryCard'
import { SheetCard } from '@/components/cheatsheet/SheetCard'
import { Hero } from '@/components/sections/Hero'

interface HomePageProps {
  cheatSheets: CheatSheet[]
  categories: Category[]
}

export function HomePage({ cheatSheets, categories }: HomePageProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const searchInstance = createSearchInstance(cheatSheets)
  const recentSheets = cheatSheets
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 12)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const results = searchInstance.search(query)
    setSearchResults(results)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        totalSheets={cheatSheets.length}
        totalCategories={categories.length}
      />

      {/* Search Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
              Find What You Need
            </h2>
            
            <SearchInput
              onSearch={handleSearch}
              onResults={setSearchResults}
              className="max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Results or Categories */}
      {isSearching && searchResults.length > 0 ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result) => (
                <motion.div
                  key={result.item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.random() * 0.1 }}
                >
                  <SheetCard sheet={result.item} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Categories Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <CategoryCard category={category} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Recent Updates */}
          <section className="py-16 bg-[var(--bg-secondary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
                  Recently Updated
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recentSheets.map((sheet, index) => (
                    <motion.div
                      key={sheet.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <SheetCard sheet={sheet} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}