import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import autoCSSModulePlugin from 'vite-plugin-auto-css-modules';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh(), autoCSSModulePlugin()],
  publicDir: './src/assets',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    brotliSize: true,
    cssCodeSplit: false,
    terserOptions: {
      mangle: true,
    },
  },
  resolve: {
    alias: {
      '@client': path.resolve(__dirname, './src/client'),
      '@server': path.resolve(__dirname, './src/server'),
      '@assets': path.resolve(__dirname, '/src/assets'),
    },
  },
});
