# CheatSheetz Frontend

A modern, dynamic single-page application providing a comprehensive interface to browse and search through the CheatSheetz collection of developer reference guides.

## 🚀 Features

- **Dynamic GitHub Integration**: Real-time fetching of all repositories from the CheatSheetz organization using GitHub API with pagination
- **Client-Side Routing**: Clean URLs with `/category` and `/category/name` routing patterns
- **Inline README Display**: View complete cheat sheet content directly in beautiful modals instead of external links
- **Auto-Hiding Navigation**: Smart navigation bar that hides on scroll down, appears on scroll up
- **Dynamic Statistics**: Real-time counts of cheat sheets and categories from GitHub data
- **Advanced Search & Filtering**: Real-time search with category and difficulty filters
- **Ultra-Responsive Design**: Mobile-first approach scaling seamlessly from mobile to 8K+ displays
- **Theme Support**: Light/dark theme with system preference detection and persistence
- **Enhanced Typography**: Improved readability with fluid typography and optimized contrast
- **Accessibility Features**: Proper focus indicators, semantic HTML, and keyboard navigation

## 🛠 Technology Stack

- **Vanilla JavaScript**: No framework dependencies, optimized for performance
- **GitHub API**: Dynamic content fetching with pagination support
- **CSS Grid & Flexbox**: Modern layout techniques with extensive breakpoint coverage
- **Web History API**: Client-side routing with browser back/forward support
- **LocalStorage**: Theme preference persistence
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 📱 Responsive Breakpoints

The design scales across all screen sizes with dedicated breakpoints:

- **Mobile**: 320px+ (1 column)
- **Small**: 576px+ (2 columns)
- **Medium**: 768px+ (tablet optimized)
- **Large**: 992px+ (desktop)
- **XL**: 1200px+ (large desktop)
- **2K**: 1400px+ (2K displays)
- **4K**: 1920px+ (4K displays)
- **5K**: 2560px+ (5K displays)
- **8K**: 7680px+ (8K+ ultra-wide)

## 🔗 URL Structure

- `/` - Homepage with all cheat sheets
- `/languages` - Programming languages category
- `/frameworks` - Web frameworks category
- `/tools` - Development tools category
- `/devops` - DevOps & infrastructure category
- `/databases` - Database systems category
- `/mobile` - Mobile development category
- `/testing` - Testing & security category
- `/{category}/{name}` - Individual cheat sheet modal

## 🏗 Architecture

```
cheatsheetz.github.io/
├── index.html              # Single-page application entry point
├── assets/
│   ├── css/
│   │   └── style.css       # Modern CSS with custom properties
│   └── js/
│       └── main.js         # Vanilla JavaScript SPA logic
├── README.md               # Documentation
├── LICENSE.md              # MIT License
└── .github/
    └── workflows/          # GitHub Actions (if applicable)
```

## 🚀 Development

### Quick Start

```bash
# Clone the repository
git clone https://github.com/cheatsheetz/cheatsheetz.github.io.git
cd cheatsheetz.github.io

# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

### GitHub API Rate Limits

The site uses the GitHub API to fetch repository data. For enhanced rate limits:

1. Create a GitHub Personal Access Token
2. Add it as a repository secret named `GITHUB_TOKEN`
3. Modify the API calls to include authentication headers

### Local Development Tips

- Use browser dev tools to test responsive breakpoints
- Test with both light and dark themes
- Verify routing works with browser back/forward buttons
- Check keyboard navigation and accessibility

## 🎨 Customization

### Theme Colors

CSS custom properties in `:root` and `[data-theme="dark"]`:

```css
--bg-primary: #ffffff;      /* Main background */
--bg-secondary: #f6f8fa;    /* Secondary background */
--bg-accent: #0066cc;       /* Accent color */
--text-primary: #1f2937;    /* Primary text */
--text-secondary: #4b5563;  /* Secondary text */
--text-link: #0066cc;       /* Link color */
```

### Categories

Add new categories in `main.js`:

```javascript
const categories = {
  newcategory: { 
    title: 'New Category', 
    icon: 'fas-icon-name', 
    color: '#hexcolor' 
  }
};
```

### Breakpoints

Modify responsive breakpoints in `style.css`:

```css
@media (min-width: YOUR_SIZE) {
  .container { max-width: YOUR_MAX_WIDTH; }
  .categories-grid { grid-template-columns: repeat(N, 1fr); }
}
```

## 🔍 SEO & Performance

- **No JavaScript Required**: Core content loads without JavaScript
- **Progressive Enhancement**: Enhanced with JavaScript features
- **Fast Loading**: Minimal external dependencies
- **Semantic HTML**: Proper heading hierarchy and structure
- **Meta Tags**: Optimized for search engines and social sharing

## 🌍 Browser Support

- **Chrome**: 60+ (full support)
- **Firefox**: 60+ (full support)
- **Safari**: 12+ (full support)
- **Edge**: 79+ (full support)
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+

## 📊 Performance Features

- **Lazy Loading**: README content fetched on demand
- **Efficient Rendering**: Virtual scrolling considerations for large lists
- **Optimized Images**: SVG icons and efficient loading
- **Minimal Dependencies**: No external JavaScript frameworks
- **Caching**: LocalStorage for theme preferences

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

1. **Enhanced Search**: Add fuzzy search, search highlighting
2. **Offline Support**: Service worker for offline browsing
3. **Analytics**: Privacy-friendly analytics integration
4. **Print Styles**: Optimized printing layouts
5. **Keyboard Shortcuts**: Power user navigation features

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test across different screen sizes and themes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE.md).

## 🙏 Acknowledgments

- **CheatSheetz Community**: For creating comprehensive developer references
- **GitHub API**: For providing free access to repository data
- **Modern CSS**: Grid, Flexbox, and Custom Properties make this possible
- **Developer Community**: For feedback and contributions

---

**Built with ❤️ for developers, by developers**

*Optimized for every screen size from mobile to 8K displays*