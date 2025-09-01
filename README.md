# Liav Yanko Interactive Resume

A modern, responsive interactive resume website built with HTML, Tailwind CSS, and vanilla JavaScript. Features a component-based architecture, dark/light theme switching, and comprehensive analytics tracking.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with excellent cross-device compatibility
- **Dark/Light Theme**: Automatic theme switching with user preference persistence
- **Component-Based Architecture**: Modular JavaScript components for better maintainability
- **Analytics Integration**: Google Analytics 4 tracking for visitor insights
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Performance Optimized**: Lazy loading, optimized images, and efficient CSS
- **Security**: Content Security Policy and other security headers

## 📁 Project Structure

```
cv/
├── index.html              # Main HTML file
├── package.json            # Node.js dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── netlify.toml           # Netlify deployment configuration
├── README.md              # This file
├── assets/                # Static assets
│   ├── LiavYankoCV.png    # Resume PDF
│   ├── memoji.webp        # Profile image
│   ├── tiger-gi.png       # Mascot image
│   └── tailwind.css       # Compiled CSS (generated)
└── src/                   # Source files
    ├── input.css          # Tailwind CSS input
    ├── config.js          # Configuration settings
    └── components.js      # Component-based JavaScript
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the CSS**
   ```bash
   npm run build
   ```

4. **Open in browser**
   - Open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

### Development

- **Watch for changes**: The build process is manual - run `npm run build` after CSS changes
- **Local development**: Analytics are disabled in development mode by default

## 📊 Analytics Configuration

### Setting up Google Analytics 4

1. **Create a GA4 property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update the configuration**:
   - Open `src/config.js`
   - Replace `'G-XXXXXXXXXX'` with your actual Measurement ID
   ```javascript
   analytics: {
     ga4MeasurementId: 'G-YOUR-ACTUAL-ID-HERE',
     // ... other settings
   }
   ```

3. **Deploy to production**:
   - Analytics only work in production (not localhost)
   - Deploy to Netlify or your preferred hosting service

### Tracked Events

The following user interactions are automatically tracked:

- **Page Views**: Initial page load
- **CV Downloads**: When users click the CV link
- **Contact Clicks**: Email and LinkedIn link clicks
- **Theme Changes**: Dark/light mode switches
- **Section Navigation**: When users navigate between sections
- **Errors**: JavaScript errors and unhandled promise rejections

## 🔧 Configuration

### Feature Flags

Control which features are enabled in `src/config.js`:

```javascript
features: {
  mobileMenu: true,        // Mobile navigation menu
  accordionDetails: true,  // Expandable experience details
  tigerMascot: true,       // Interactive mascot
  smoothScrolling: true,   // Smooth scroll behavior
  intersectionObserver: true // Navigation highlighting
}
```

### Analytics Settings

```javascript
analytics: {
  enabled: true,           // Enable/disable analytics
  events: {
    pageView: true,        // Track page views
    cvDownload: true,      // Track CV downloads
    contactClick: true,    // Track contact clicks
    themeChange: true,     // Track theme changes
    sectionNavigation: true, // Track navigation
    errorTracking: true    // Track errors
  }
}
```

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Build settings**:
   - Build command: `npm install --no-audit --no-fund && npm run build`
   - Publish directory: `.`
   - Node version: `18`

3. **Environment variables** (optional):
   - Add any environment-specific configurations

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files** to your web server:
   - `index.html`
   - `assets/` directory
   - `src/` directory

## 🔒 Security Features

- **Content Security Policy**: Restricts resource loading to trusted sources
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Additional XSS protection
- **Referrer Policy**: Controls referrer information
- **Permissions Policy**: Restricts browser features

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Contact

For questions or support, contact Liav Yanko at liavyanko@gmail.com

---

**Note**: This is a personal resume website showcasing Liav Yanko's professional experience and skills. The codebase demonstrates modern web development practices and can serve as a template for similar projects.
