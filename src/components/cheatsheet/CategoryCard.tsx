import Link from 'next/link'
import { motion } from 'framer-motion'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/${category.key}`}>
      <motion.div
        className="
          group card cursor-pointer
          hover:scale-105 hover:shadow-lg
          transition-all duration-200
        "
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
          </div>
          
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {category.title}
          </h3>
          
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Essential {category.title.toLowerCase()} references
          </p>
          
          <span className="text-sm font-medium text-[var(--accent-info)]">
            {category.count} cheat sheets
          </span>
        </div>
      </motion.div>
    </Link>
  )
}