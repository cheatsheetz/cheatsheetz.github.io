import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheatSheet } from '@/types'
import { CATEGORY_PATTERNS } from '@/lib/github'

interface SheetCardProps {
  sheet: CheatSheet
}

const difficultyColors = {
  beginner: 'bg-[var(--accent-secondary)]',
  intermediate: 'bg-[var(--accent-warning)]', 
  advanced: 'bg-[var(--accent-error)]'
}

export function SheetCard({ sheet }: SheetCardProps) {
  const categoryInfo = CATEGORY_PATTERNS[sheet.category as keyof typeof CATEGORY_PATTERNS]
  
  return (
    <Link href={`/${sheet.category}/${sheet.slug}`}>
      <motion.div
        className="
          group card cursor-pointer h-full
          hover:shadow-lg transition-all duration-200
          border-l-4 border-l-[var(--accent-primary)]
        "
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
              {sheet.name}
            </h3>
            
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium text-white shrink-0 ml-2
              ${difficultyColors[sheet.difficulty]}
            `}>
              {sheet.difficulty}
            </span>
          </div>
          
          <p className="text-sm text-[var(--text-secondary)] mb-4 flex-grow line-clamp-2">
            {sheet.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {sheet.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  px-2 py-1 text-xs rounded-md
                  bg-[var(--bg-secondary)] text-[var(--text-primary)]
                  border border-[var(--accent-primary)]/20
                "
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span className="font-medium">
              {categoryInfo?.title || sheet.category}
            </span>
            <span>
              ⭐ {sheet.stars}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}