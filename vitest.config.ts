import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './'),
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './'),
    }
  }
})