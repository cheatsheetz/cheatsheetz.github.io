'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SearchResult } from '@/types'

interface SearchInputProps {
  onSearch: (query: string) => void
  onResults: (results: SearchResult[]) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ onSearch, onResults, placeholder = "Search cheat sheets...", className = "" }: SearchInputProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      
      if (e.key === 'Escape') {
        inputRef.current?.blur()
        setQuery('')
        onSearch('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSearch])

  // Debounced search
  useEffect(() => {
    const debounced = setTimeout(() => {
      onSearch(query)
    }, 200)

    return () => clearTimeout(debounced)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          relative flex items-center
          bg-[var(--bg-surface)] border rounded-xl
          transition-all duration-200
          ${isFocused 
            ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20' 
            : 'border-[var(--bg-secondary)] hover:border-[var(--accent-primary)]/50'
          }
        `}
        layout
      >
        <MagnifyingGlassIcon className="w-5 h-5 ml-4 text-[var(--text-secondary)]" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            flex-1 px-4 py-3 bg-transparent border-none outline-none
            text-[var(--text-primary)] placeholder-[var(--text-secondary)]
            text-sm
          "
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="
                mr-4 p-1 rounded-md
                text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                hover:bg-[var(--bg-secondary)]
                transition-colors duration-200
              "
              aria-label="Clear search"
            >
              <XMarkIcon className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Search shortcut hint */}
        <div className="hidden sm:flex items-center mr-4 text-xs text-[var(--text-secondary)]">
          <kbd className="px-2 py-1 bg-[var(--bg-secondary)] rounded border text-[var(--text-muted)]">
            ⌘K
          </kbd>
        </div>
      </motion.div>
    </div>
  )
}