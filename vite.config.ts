import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    // The 3D vendor chunk is intentionally large but lazy-loaded and only
    // fetched on capable tiers, so the default 500 kB warning is noise here.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split the heavy 3D vendor into its own chunk so it caches
          // independently and never bloats the main app bundle.
          if (id.includes('node_modules')) {
            if (
              id.includes('three') ||
              id.includes('@react-three') ||
              id.includes('react-reconciler') ||
              id.includes('its-fine') ||
              id.includes('zustand') ||
              id.includes('suspend-react')
            ) {
              return 'three-vendor';
            }
          }
        },
      },
    },
  },
});
