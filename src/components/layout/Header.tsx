'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Hide/show header based on scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      // Add background on scroll
      setIsScrolled(scrollY > 50)
      setLastScrollY(scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <ThemeToggle />
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled ? 'bg-[var(--bg-primary)]/95 backdrop-blur-lg shadow-sm border-b border-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              CheatSheetz
            </Link>
            
            <Navigation />
          </div>
        </div>
      </header>
    </>
  )
}