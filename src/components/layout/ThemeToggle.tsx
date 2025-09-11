'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage or system preference
    const saved = localStorage.getItem('theme') as 'light' | 'dark'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = saved || systemTheme
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="
        fixed top-2 right-2 z-[1000]
        w-3 h-3 rounded-full
        bg-dracula-purple text-white
        border-none cursor-pointer
        opacity-40 hover:opacity-100
        transition-all duration-300
        flex items-center justify-center
      "
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <span className="text-[6px]">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </motion.button>
  )
}