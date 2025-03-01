import tailwindcss from '@tailwindcss/vite';
import honox from 'honox/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import client from 'honox/vite/client';

/*
export default defineConfig({
  plugins: [
    honox({
      client: { input: ['./app/style.css'] },
    }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  }
});
*/

export default defineConfig(({ mode }) => {
  const common = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './app'),
      },
    },
  };

  if (mode === 'client') {
    return {
      ...common,
      plugins: [client({ jsxImportSource: 'react' })],
      build: {
        rollupOptions: {
          input: ['./app/style.css'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
      },
    };
  } else {
    return {
      ...common,
      ssr: { external: ['react', 'react-dom'] },
      plugins: [honox(), tailwindcss()],
    };
  }
});
