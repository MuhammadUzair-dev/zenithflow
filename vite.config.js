import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves from /zenithflow/ subpath
  base: '/zenithflow/',

  build: {
    // Minify aggressively to make code harder to read
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log statements
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        toplevel: true,      // Mangle top-level variable names
      },
      format: {
        comments: false,     // Strip all comments
      },
    },
    // Generate hashed filenames for cache busting
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
