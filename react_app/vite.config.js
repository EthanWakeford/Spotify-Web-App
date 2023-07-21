import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000/',
    },
  },

  plugins: [react()],
});
