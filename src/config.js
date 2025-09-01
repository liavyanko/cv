/**
 * Configuration file for Liav Yanko Resume
 * Centralized settings for analytics, features, and other configurable options
 */

const CONFIG = {
  // Analytics Configuration
  analytics: {
    // Google Analytics 4 Measurement ID
    // Replace with your actual GA4 measurement ID when ready
    ga4MeasurementId: 'G-XXXXXXXXXX',
    
    // Enable analytics in production only
    enabled: window.location.hostname !== 'localhost' && 
             window.location.hostname !== '127.0.0.1' &&
             window.location.hostname !== '',
    
    // Track specific events
    events: {
      pageView: true,
      cvDownload: true,
      contactClick: true,
      themeChange: true,
      sectionNavigation: true,
      errorTracking: true
    }
  },
  
  // Theme Configuration
  theme: {
    defaultDark: true,
    persistInLocalStorage: true
  },
  
  // Performance Configuration
  performance: {
    lazyLoadImages: true,
    preloadCriticalAssets: true,
    enableServiceWorker: false // Set to true when implementing SW
  },
  
  // Feature Flags
  features: {
    mobileMenu: true,
    accordionDetails: true,
    tigerMascot: true,
    smoothScrolling: true,
    intersectionObserver: true
  },
  
  // Error Handling
  errorHandling: {
    logToConsole: true,
    sendToAnalytics: true,
    showUserFriendlyMessages: false
  }
};

// Freeze the config to prevent modifications
Object.freeze(CONFIG);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
