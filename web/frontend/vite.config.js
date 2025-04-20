import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(
    mode, 
    path.resolve(process.cwd()), // Points to web folder
    'VITE_' // Prefix for client-side env vars
  );

  return {
    optimizeDeps: {
      include: ['@shopify/polaris']
    },
    publicDir: './public',
    plugins: [react()],
    base: '/',
    server: {
      port: 7000,
      strictPort: true,
      hmr: {
        host: env.VITE_APP_HOST || 'localhost',
      },
    },
    build: {
      outDir: '../public',
      emptyOutDir: true,
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        output: {
          assetFileNames: (assetInfo) => {
            if (['robots.txt', 'index.php'].includes(assetInfo.name)) {
              return '[name][extname]'; // Keep original filename
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    resolve: {
      alias: {
        '@shopify/app-bridge-core': path.resolve(
          __dirname,
          'node_modules/@shopify/app-bridge-core'
        ),
        '@shopify/app-bridge-react': path.resolve(
          __dirname,
          'node_modules/@shopify/app-bridge-react'
        ),
        '@shopify/app-bridge-utils': path.resolve(
          __dirname,
          'node_modules/@shopify/app-bridge-utils'
        ),
        '@': path.resolve(__dirname, './src'),
        '@shopify/polaris-styles': path.resolve(
          __dirname,
          'node_modules/@shopify/polaris/build/esm/styles.css'
        )
      }
    }
  }
});
