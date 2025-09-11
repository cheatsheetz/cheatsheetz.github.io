'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/cli', label: 'CLI' },
  { href: '/help', label: 'Help' },
  { href: '/about', label: 'About' }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <div key={item.href} className="relative">
            {isActive ? (
              <motion.span
                layoutId="activeNav"
                className="
                  px-3 py-2 text-sm font-semibold rounded-lg
                  bg-[var(--accent-primary)] text-[var(--text-inverse)]
                  cursor-default
                "
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30
                }}
              >
                {item.label}
              </motion.span>
            ) : (
              <Link
                href={item.href}
                className="
                  px-3 py-2 text-sm font-medium rounded-lg
                  text-[var(--text-primary)] 
                  hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-primary)]
                  transition-all duration-200
                  relative overflow-hidden group
                "
              >
                <span className="relative z-10">{item.label}</span>
                <div className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  -translate-x-full group-hover:translate-x-full transition-transform duration-500
                " />
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}