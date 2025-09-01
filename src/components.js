/**
 * Component-based JavaScript for Liav Yanko Resume
 * Organized into modular components for better maintainability
 */

// Theme Management Component
class ThemeManager {
  constructor() {
    this.themeBtn = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    this.setInitialTheme();
    this.bindEvents();
  }

  setInitialTheme() {
    const saved = localStorage.getItem('theme');
    const wantsDarkByDefault = window.CONFIG?.theme?.defaultDark ?? true;
    const shouldDark = saved ? (saved === 'dark') : wantsDarkByDefault;
    
    if (shouldDark) document.documentElement.classList.add('dark');
    if (!saved && window.CONFIG?.theme?.persistInLocalStorage) {
      localStorage.setItem('theme', shouldDark ? 'dark' : 'light');
    }
  }

  bindEvents() {
    this.themeBtn?.addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (window.lucide) lucide.createIcons();
    });
  }
}

// Mobile Navigation Component
class MobileNavigation {
  constructor() {
    this.mobileBtn = document.getElementById('mobileToggle');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.mobileBtn?.addEventListener('click', () => {
      this.mobileMenu.classList.toggle('hidden');
      const icon = this.mobileBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', this.mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
      }
      if (window.lucide) lucide.createIcons();
    });

    // Auto-close on navigation link click
    document.querySelectorAll('#mobileMenu a[data-nav]').forEach(a => {
      a.addEventListener('click', () => this.mobileMenu.classList.add('hidden'));
    });
  }
}

// Navigation Highlighting Component
class NavigationHighlighter {
  constructor() {
    this.navLinks = document.querySelectorAll('a[data-nav]');
    this.sections = ['hero', 'about', 'projects', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    this.navMap = {};
    this.init();
  }

  init() {
    this.buildNavMap();
    this.setupIntersectionObserver();
  }

  buildNavMap() {
    this.navLinks.forEach(a => {
      const hash = a.getAttribute('href') || '';
      const id = hash.replace('#', '');
      this.navMap[id] = this.navMap[id] || [];
      this.navMap[id].push(a);
    });
  }

  setActive(id) {
    this.navLinks.forEach(a => a.classList.remove('bg-brand-50', 'dark:bg-slate-800', 'text-brand-700', 'dark:text-brand-300'));
    (this.navMap[id] || []).forEach(a => a.classList.add('bg-brand-50', 'dark:bg-slate-800', 'text-brand-700', 'dark:text-brand-300'));
  }

  setupIntersectionObserver() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) this.setActive(e.target.id);
      });
    }, { root: null, rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });

    this.sections.forEach(sec => io.observe(sec));
  }
}

// Accordion Component
class Accordion {
  constructor(sectionId) {
    this.root = document.getElementById(sectionId);
    if (!this.root) return;
    
    this.buttons = Array.from(this.root.querySelectorAll('.toggle-details[aria-controls]'));
    this.panels = this.buttons
      .map(b => document.getElementById(b.getAttribute('aria-controls')))
      .filter(Boolean);
    
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.root.addEventListener('click', (e) => {
      const btn = e.target.closest('.toggle-details');
      if (!btn || !this.root.contains(btn)) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      const id = btn.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      if (!panel) return;

      const shouldOpen = btn.getAttribute('aria-expanded') !== 'true';

      // Close all panels in this section
      this.panels.forEach(p => p.classList.add('hidden'));
      this.buttons.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ic = b.querySelector('[data-lucide]');
        if (ic) ic.style.transform = 'rotate(0deg)';
      });

      // Open only the current panel (if it was closed)
      if (shouldOpen) {
        panel.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        const ic = btn.querySelector('[data-lucide]');
        if (ic) ic.style.transform = 'rotate(180deg)';
      }
    }, true);
  }
}

// Tiger Mascot Component
class TigerMascot {
  constructor() {
    this.tiger = document.querySelector('.tiger-wrapper');
    this.init();
  }

  init() {
    if (!this.tiger) return;
    this.bindEvents();
  }

  bindEvents() {
    // Tap/click - Toggle (mobile only)
    this.tiger.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        this.tiger.classList.toggle('show-bubble');
      }
    });

    // Close bubble when clicking outside (mobile only)
    document.addEventListener('click', (e) => {
      if (!window.matchMedia('(max-width: 768px)').matches) return;
      if (!this.tiger.contains(e.target)) {
        this.tiger.classList.remove('show-bubble');
      }
    }, true);
  }
}

// Analytics Component
class Analytics {
  constructor() {
    this.init();
  }

  init() {
    this.setupGoogleAnalytics();
    this.trackPageViews();
    this.trackUserInteractions();
  }

  setupGoogleAnalytics() {
    // Check if analytics is enabled
    if (!window.CONFIG?.analytics?.enabled) {
      console.log('Analytics disabled in development mode');
      return;
    }

    const measurementId = window.CONFIG?.analytics?.ga4MeasurementId;
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.log('Analytics measurement ID not configured');
      return;
    }

    // Google Analytics 4 setup
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', measurementId);

    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  trackPageViews() {
    const events = window.CONFIG?.analytics?.events || {};
    
    if (events.pageView) {
      // Track initial page load
      this.trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  trackUserInteractions() {
    const events = window.CONFIG?.analytics?.events || {};
    
    // Track CV download
    if (events.cvDownload) {
      document.querySelector('a[href*="LiavYankoCV.png"]')?.addEventListener('click', () => {
        this.trackEvent('cv_download', {
          method: 'direct_link'
        });
      });
    }

    // Track contact clicks
    if (events.contactClick) {
      document.querySelectorAll('a[href^="mailto:"], a[href*="linkedin.com"]').forEach(link => {
        link.addEventListener('click', () => {
          this.trackEvent('contact_click', {
            method: link.href.includes('mailto:') ? 'email' : 'linkedin'
          });
        });
      });
    }

    // Track theme changes
    if (events.themeChange) {
      document.getElementById('themeToggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        this.trackEvent('theme_change', {
          theme: isDark ? 'dark' : 'light'
        });
      });
    }

    // Track section navigation
    if (events.sectionNavigation) {
      document.querySelectorAll('a[data-nav]').forEach(link => {
        link.addEventListener('click', () => {
          const section = link.getAttribute('href').replace('#', '');
          this.trackEvent('section_navigation', {
            section: section
          });
        });
      });
    }
  }

  trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    // Fallback console logging for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Analytics Event:', eventName, parameters);
    }
  }
}

// Error Handling Component
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    this.setupGlobalErrorHandling();
    this.setupUnhandledRejectionHandling();
  }

  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      this.handleError('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.stack
      });
    });
  }

  setupUnhandledRejectionHandling() {
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('Unhandled Promise Rejection', {
        reason: event.reason
      });
    });
  }

  handleError(type, details) {
    const config = window.CONFIG?.errorHandling || {};
    
    // Log error for debugging
    if (config.logToConsole) {
      console.error(`${type}:`, details);
    }
    
    // Send to analytics if available and enabled
    if (config.sendToAnalytics && window.analytics && window.analytics.trackEvent) {
      window.analytics.trackEvent('error', {
        error_type: type,
        ...details
      });
    }
    
    // Could also send to error reporting service like Sentry
  }
}

// Main Application Class
class ResumeApp {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupComponents());
    } else {
      this.setupComponents();
    }
  }

  setupComponents() {
    try {
      // Initialize all components
      this.components.themeManager = new ThemeManager();
      this.components.mobileNav = new MobileNavigation();
      this.components.navHighlighter = new NavigationHighlighter();
      this.components.tigerMascot = new TigerMascot();
      this.components.errorHandler = new ErrorHandler();
      
      // Initialize accordions for different sections
      this.components.experienceAccordion = new Accordion('experience');
      this.components.projectsAccordion = new Accordion('projects');
      
      // Initialize analytics based on configuration
      if (window.CONFIG?.analytics?.enabled) {
        this.components.analytics = new Analytics();
      }
      
      // Initialize icons
      if (window.lucide) {
        lucide.createIcons();
      }
      
      // Set current year
      document.getElementById('year').textContent = new Date().getFullYear();
      
      // Handle hash navigation
      this.handleHashNavigation();
      
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  handleHashNavigation() {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    }
  }
}

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
  window.resumeApp = new ResumeApp();
});
