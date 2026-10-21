import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import fs from 'fs';
// https://vite.dev/config/

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = mode === 'development';
  const isAnalyze = mode === 'analyze';

  return {
    server: {
      https: isDev
        ? {
            key: fs.readFileSync('localhost-key.pem'),
            cert: fs.readFileSync('localhost.pem'),
          }
        : undefined,
      proxy: isDev
        ? {
            '/api': {
              target: env.VITE_API_URL,
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },

    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      mkcert(),
      isAnalyze &&
        visualizer({
          filename: 'dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            query: ['@tanstack/react-query'],
            ui: [
              '@radix-ui/react-dialog',
              '@radix-ui/react-popover',
              '@radix-ui/react-tooltip',
              '@radix-ui/react-select',
              'vaul',
              'sonner',
              'react-mobile-picker',
            ],
            date: ['react-day-picker', 'date-fns'],
          },
        },
      },
    },
  };
});
