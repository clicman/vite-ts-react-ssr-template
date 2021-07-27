import { defineConfig } from 'vite';
import autoCSSModulePlugin from 'vite-plugin-auto-css-modules';
import path from 'path';

export default defineConfig({
  plugins: [autoCSSModulePlugin()],
  publicDir: './src/assets',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    brotliSize: true,
    cssCodeSplit: false,
    terserOptions: {
      mangle: true,
    },
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, '/src/server'),
      '@client': path.resolve(__dirname, '/src/client'),
      '@assets': path.resolve(__dirname, '/src/assets'),
    },
  },
});
