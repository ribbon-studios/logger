import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, './src/index.ts')],
      formats: ['es', 'cjs'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'lcovonly'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['/demo/', '**/dist/', '**/__tests__/'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
