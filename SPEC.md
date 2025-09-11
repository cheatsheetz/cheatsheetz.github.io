# CheatSheetz Next.js Application Specification

## 🎯 Project Overview

A modern, interactive Next.js application that dynamically fetches and displays developer cheat sheets from the CheatSheetz GitHub organization. Built with performance, usability, and developer experience in mind.

## 🏗️ Technology Stack

### Core Framework
- **Next.js 14+** with App Router
- **React 18+** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling

### Build & Data
- **Static Site Generation (SSG)** for performance
- **Incremental Static Regeneration (ISR)** for fresh content
- **GitHub API** integration at build time
- **Markdown processing** with syntax highlighting

### Search & Interactivity
- **Fuse.js** for fuzzy search
- **React Query/SWR** for client-side caching
- **Framer Motion** for smooth animations
- **Next.js Image** for optimized images

## 🌐 Site Architecture

### URL Structure
```
/ (homepage)
├── /cli (CLI tool page)
├── /help (help documentation)
├── /about (project information)
├── /search?q=query (search results)
├── /[category] (category pages)
│   ├── /languages
│   ├── /frameworks
│   ├── /tools
│   ├── /devops
│   ├── /databases
│   ├── /mobile
│   ├── /testing
│   └── /design
└── /[category]/[slug] (individual cheat sheets)
    ├── /languages/python
    ├── /tools/git
    └── /frameworks/react
```

### Page Types
1. **Homepage** (`/`) - Hero, categories, search, recent updates
2. **Category Pages** (`/[category]`) - Filtered cheat sheets by category
3. **Sheet Pages** (`/[category]/[slug]`) - Individual cheat sheet with README content
4. **Static Pages** (`/cli`, `/help`, `/about`) - Information pages
5. **Search Results** (`/search`) - Fuzzy search results page

## 🎨 Design System

### Theme (Dracula-inspired)
```css
/* Dark Theme (Default) */
--bg-primary: #282a36
--bg-secondary: #44475a
--bg-surface: #383a59
--text-primary: #ffffff (much lighter)
--text-secondary: #e2e8f0 (light gray)
--accent-primary: #bd93f9 (purple)
--accent-secondary: #50fa7b (green)
--accent-info: #8be9fd (cyan)
--accent-warning: #ffb86c (orange)
--accent-error: #ff5555 (red)

/* Light Theme */
--bg-primary: #ffffff
--bg-secondary: #f8fafc
--text-primary: #0f172a (much darker)
--text-secondary: #334155 (dark gray)
--accent-primary: #3b82f6 (blue)
```

### Typography
- **Font Stack**: Inter, system fonts
- **Fluid Typography**: clamp() for responsive text sizing
- **Rem Units**: All spacing and sizing in rem
- **Code Font**: SF Mono, Monaco, Cascadia Code

### Components
- **Header**: Fixed header with auto-hide on scroll
- **Navigation**: Home | CLI | Help | About (compact spacing)
- **Theme Toggle**: Tiny (0.75rem), nearly invisible (40% opacity)
- **Search**: Responsive width, instant fuzzy search
- **Cards**: Clean, minimal design with hover effects
- **Code Blocks**: Horizontal scrolling, syntax highlighting

## 📊 Data Management

### Build-time GitHub API Fetching
```typescript
// lib/github.ts
interface Repository {
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

interface Category {
  key: string
  title: string
  icon: string
  color: string
  count: number
}
```

### Dynamic Categorization
- **Smart Detection**: Based on repo name, topics, description, README content
- **Scoring System**: Weighted algorithm for accurate categorization
- **Fallback Categories**: "Other" for uncategorized repos
- **Auto-generated**: Categories only exist if they have repos

### Repository Structure
- **Organization**: `cheatsheetz` (GitHub)
- **Website**: `cheatsheetz.github.io` (this Next.js app)
- **CLI Tool**: `cli` (POSIX command line tool)
- **Android App**: `android` (mobile application)
- **Community Hub**: `community` (issues, requests, discussions)
- **Templates**: `template` (issue templates, new sheet templates)
- **Cheat Sheets**: All other repositories (python, docker, git, vim, etc.)

### Exclusion Rules
```typescript
const EXCLUDED_REPOS = [
  'cheatsheetz.github.io', // This website
  '.github',              // Organization meta files
  'template',             // Template files (.github/ISSUE_TEMPLATE, NEW_CHEATSHEET.md, etc)
  'community',            // Community hub (issues, new cheat requests, discussions)
  'cli',                  // CLI tool (separate application from cheat sheets)
  'android',              // Android app (separate application from cheat sheets)
  'docs',                 // Documentation repository
  'profile',              // GitHub profile README
  'assets',               // Static assets repository
  'config'                // Configuration files
]
```

## 🔍 Search System

### Fuzzy Search Features
- **Real-time**: Search as you type
- **Multi-field**: Name, description, tags, README content
- **Weighted Results**: Name matches > description > tags > content
- **Keyboard Navigation**: Arrow keys, Enter to select
- **Search Highlighting**: Matched terms highlighted in results

### Search Implementation
```typescript
// lib/search.ts
import Fuse from 'fuse.js'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'readme', weight: 0.1 }
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Tailwind-style breakpoints */
sm: 640px   (40rem)
md: 768px   (48rem) 
lg: 1024px  (64rem)
xl: 1280px  (80rem)
2xl: 1536px (96rem)
```

### Layout Strategy
- **Mobile-first**: Design for mobile, enhance for desktop
- **Grid System**: CSS Grid for category/sheet layouts
- **Flexible Cards**: Auto-fit grid with min/max sizing
- **Responsive Navigation**: Collapsible on small screens
- **Touch-friendly**: Proper touch targets (44px minimum)

## ⚡ Performance

### Optimization Strategies
- **Static Generation**: Pre-render all pages at build time
- **Image Optimization**: Next.js Image with WebP
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression
- **CDN**: Deploy to Vercel/Netlify edge network

### Caching Strategy
- **GitHub API**: Cache repo data for 2 hours
- **README Content**: Cache individual files
- **Static Assets**: Long-term caching with hashing
- **ISR**: Revalidate content every 12 hours

## 🧩 Component Structure

### Layout Components
```
components/
├── layout/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ThemeToggle.tsx
├── search/
│   ├── SearchInput.tsx
│   ├── SearchResults.tsx
│   └── SearchFilters.tsx
├── cheatsheet/
│   ├── SheetCard.tsx
│   ├── SheetGrid.tsx
│   ├── CategoryCard.tsx
│   └── ReadmeContent.tsx
└── ui/
    ├── Button.tsx
    ├── Badge.tsx
    ├── CodeBlock.tsx
    └── LoadingSpinner.tsx
```

### Page Components
```
app/
├── page.tsx (homepage)
├── layout.tsx (root layout)
├── loading.tsx (loading UI)
├── not-found.tsx (404 page)
├── [category]/
│   ├── page.tsx (category listing)
│   └── [slug]/
│       └── page.tsx (individual sheet)
├── search/
│   └── page.tsx (search results)
├── cli/
│   └── page.tsx (CLI tool page)
├── help/
│   └── page.tsx (help documentation)
└── about/
    └── page.tsx (about page)
```

## 🎪 Interactive Features

### Fuzzy Search
- **Instant Results**: Search as you type with 200ms debounce
- **Keyboard Shortcuts**: Cmd/Ctrl+K to focus search
- **Recent Searches**: Remember last 5 searches
- **Search Suggestions**: Auto-complete based on popular terms
- **Empty State**: Helpful suggestions when no results

### Enhanced UI
- **Smooth Animations**: Page transitions, hover effects
- **Loading States**: Skeleton screens for content loading
- **Error Boundaries**: Graceful error handling
- **Toast Notifications**: Copy success, error messages
- **Progressive Enhancement**: Works without JavaScript

### Code Features
- **Syntax Highlighting**: Prism.js or Shiki
- **Copy Buttons**: One-click copy for all code blocks
- **Line Numbers**: Optional line numbering
- **Language Detection**: Auto-detect code language
- **Theme Aware**: Code themes match site theme

## 🔧 Build System

### GitHub API Integration
```typescript
// lib/build-data.ts
export async function getAllCheatSheets(): Promise<CheatSheet[]> {
  // 1. Fetch all repositories with pagination
  // 2. Filter excluded repos
  // 3. Fetch README content for each repo
  // 4. Parse and categorize content
  // 5. Return structured data
}

export async function generateStaticProps() {
  // Build-time data fetching for SSG
}
```

### Error Handling
- **Rate Limiting**: Graceful GitHub API rate limit handling
- **Fallback Content**: Generate basic content for missing READMEs
- **Build Resilience**: Continue build even if some repos fail
- **Detailed Logging**: Production-safe error reporting

### Deployment
- **GitHub Actions**: Auto-deploy on push + twice daily
- **Environment Variables**: `GITHUB_TOKEN` for API access
- **Cache Management**: Efficient caching strategy
- **Production Optimizations**: Minification, compression

## 🎯 User Experience Goals

### Performance Targets
- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

### Accessibility
- **WCAG AA Compliance**: Color contrast, keyboard navigation
- **Screen Reader Support**: Proper ARIA labels
- **Focus Management**: Logical tab order
- **Reduced Motion**: Respect user preferences

### Usability
- **Intuitive Navigation**: Clear information architecture
- **Fast Search**: Find any cheat sheet in < 3 seconds
- **Mobile Optimized**: Excellent mobile experience
- **Print Friendly**: Clean print layouts

## 📦 Dependencies

### Core Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "@tailwindcss/typography": "^0.5.0",
  "fuse.js": "^7.0.0",
  "framer-motion": "^10.0.0",
  "prismjs": "^1.29.0",
  "marked": "^9.0.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.0.0",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.0.0",
  "prettier": "^3.0.0"
}
```

## 🚀 Development Workflow

### Local Development
```bash
npm install
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code
npm run type-check   # TypeScript checking
```

### Build Process
1. **Fetch GitHub Data**: All repositories + README content
2. **Process & Categorize**: Smart categorization algorithm
3. **Generate Static Pages**: Pre-render all routes
4. **Optimize Assets**: Image optimization, code splitting
5. **Deploy**: GitHub Pages or Vercel deployment

## 🎨 Design Principles

### Visual Design
- **Dracula-inspired**: Beautiful purple theme with excellent contrast
- **Minimal UI**: Clean, uncluttered interface
- **GitHub-inspired**: Familiar patterns for developers
- **Card-based**: Consistent card design throughout
- **Generous Whitespace**: Breathing room for readability

### Interaction Design  
- **Immediate Feedback**: Hover states, loading indicators
- **Keyboard First**: Full keyboard navigation support
- **Progressive Disclosure**: Show details on demand
- **Consistent Patterns**: Similar interactions across components
- **Error Prevention**: Clear validation and guidance

## 📋 Features Checklist

### Core Features
- [ ] Homepage with hero, categories, search, recent updates
- [ ] Dynamic category pages with filtering/sorting
- [ ] Individual cheat sheet pages with README content
- [ ] Real-time fuzzy search with highlighting
- [ ] Responsive design (mobile to 8K+)
- [ ] Dark/light theme with system detection
- [ ] Auto-hiding header with scroll detection

### Advanced Features  
- [ ] CLI tool page with install instructions
- [ ] Help documentation with FAQ
- [ ] About page with project information
- [ ] Print-optimized layouts
- [ ] Keyboard shortcuts (Cmd+K for search)
- [ ] Toast notifications for user feedback
- [ ] Loading skeletons for better UX

### Technical Features
- [ ] GitHub API integration with pagination
- [ ] Automatic README content fetching
- [ ] Dynamic category generation
- [ ] Syntax highlighting for code blocks
- [ ] Horizontal scrolling for long commands
- [ ] SEO optimization (meta tags, sitemaps)
- [ ] Error boundaries and 404/500 pages

## 🔄 Build & Deployment

### GitHub Actions Workflow
```yaml
name: Deploy Next.js App
on:
  push: { branches: [main] }
  schedule: [{ cron: '0 6,18 * * *' }]
  
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: Build Next.js app with GitHub data
      - name: Deploy to GitHub Pages
```

### Environment Configuration
- **GITHUB_TOKEN**: For enhanced API rate limits
- **NODE_ENV**: Production/development mode detection
- **NEXT_PUBLIC_***: Client-side environment variables

## 🎁 Expected Benefits

### Developer Experience
- **Hot Reload**: Instant development feedback
- **TypeScript**: Better code quality and IDE support
- **Component-based**: Reusable, maintainable code
- **Built-in Optimization**: Next.js handles performance automatically

### User Experience
- **Fast Loading**: Static generation + CDN
- **Smooth Interactions**: No layout shifts or scrolling issues
- **Better Search**: Fuzzy search finds anything quickly
- **Mobile Perfect**: Proper responsive design
- **Accessible**: WCAG compliance built-in

### Maintenance
- **Zero Config**: Next.js handles bundling, optimization
- **Auto Updates**: ISR keeps content fresh
- **Error Resilience**: Better error handling and recovery
- **Future Proof**: Modern architecture that scales

---

## 🎯 Success Criteria

1. **No horizontal scrolling issues** ✅
2. **Proper code block display** ✅  
3. **Excellent mobile experience** ✅
4. **Fast, accurate search** ✅
5. **Beautiful, accessible design** ✅
6. **Zero maintenance required** ✅

This Next.js rebuild will solve all current layout issues while providing a modern, interactive experience that scales beautifully from mobile to desktop.

## 📄 Licensing

### CheatSheetz Code (MIT License)
All CheatSheetz-authored code is licensed under the MIT License:
- **Website code** (cheatsheetz.github.io)
- **CLI tool** (cli repository)
- **Android app** (android repository)  
- **Cheat sheet content** (all individual cheat sheet repositories)
- **Templates and documentation**

### Third-Party Dependencies
Third-party libraries and dependencies retain their original licenses:
- **Next.js**: MIT License
- **React**: MIT License  
- **Tailwind CSS**: MIT License
- **Fuse.js**: Apache License 2.0
- **Framer Motion**: MIT License
- **Marked**: MIT License
- **Prism.js**: MIT License
- **Heroicons**: MIT License

### License Compliance
- All third-party licenses are respected and maintained
- No modification of third-party license terms
- Clear attribution in package.json and documentation
- Compliance with all dependency license requirements

### Usage Rights
- **CheatSheetz content**: Free to use, modify, distribute under MIT
- **Third-party code**: Subject to individual library licenses
- **Combined work**: Users must comply with all applicable licenses