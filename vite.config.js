import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  base: mode === 'production' ? '/emoji/' : '/', // Set the base URL conditionally
  build: {
    cssCodeSplit: false,
    minify: 'terser',
  }
}))