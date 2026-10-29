import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const base = process.env.VITE_BASE_PATH || '/website/'
const isProduction = base === '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'noindex-test-site',
      transformIndexHtml() {
        if (isProduction) return undefined

        return [
          {
            tag: 'meta',
            attrs: { name: 'robots', content: 'noindex, follow' },
            injectTo: 'head',
          },
        ]
      },
    },
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
