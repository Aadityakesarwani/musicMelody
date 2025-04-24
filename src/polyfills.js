// Add global polyfill for browser environment
if (typeof global === 'undefined') {
  window.global = window;
} 