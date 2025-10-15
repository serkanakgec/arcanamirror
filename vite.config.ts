import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-admin-dashboard',
      closeBundle() {
        try {
          copyFileSync(
            resolve(__dirname, 'admin-dashboard.html'),
            resolve(__dirname, 'dist/admin-dashboard.html')
          );
          console.log('✓ Admin dashboard copied to dist/');
        } catch (error) {
          console.error('Failed to copy admin dashboard:', error);
        }
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
