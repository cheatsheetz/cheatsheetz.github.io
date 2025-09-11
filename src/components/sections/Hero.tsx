import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeroProps {
  totalSheets: number
  totalCategories: number
}

export function Hero({ totalSheets, totalCategories }: HeroProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-inverse)] mb-6">
            CheatSheetz
          </h1>
          
          <p className="text-xl sm:text-2xl text-[var(--text-inverse)]/90 mb-4">
            Developer Reference Collection
          </p>
          
          <p className="text-lg text-[var(--text-inverse)]/80 mb-12 max-w-2xl mx-auto">
            Quick reference guides for programming languages, frameworks, tools, and technologies. 
            From beginner to advanced.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {totalSheets > 100 ? `${totalSheets}+` : totalSheets}
              </div>
              <div className="text-white/90">
                Cheat Sheets
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {totalCategories}
              </div>
              <div className="text-white/90">
                Categories
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-[var(--text-inverse)] mb-2">
                100%
              </div>
              <div className="text-[var(--text-inverse)]/90">
                Open Source
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary"
            >
              Browse Collection
            </button>
            
            <Link
              href="https://github.com/cheatsheetz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span className="mr-2">📁</span>
              GitHub Organization
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}