import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa' 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    [svelte()],
    VitePWA({
      manifest: {
        "short_name": "Emoji Picker",
        "name": "Emoji Picker",
        "icons": [
          {
            "src": "/emoji/vite.svg",
            "sizes": "192x192",
            "type": "image/svg+xml"
          }
        ],
        "start_url": "https://studioplay.nl/emoji/",
        "background_color": "#ffffff",
        "display": "standalone",
        "scope": "/",
        "theme_color": "#ffffff"
      },
      workbox: {}
    })
  ],
  base: mode === 'production' ? '/emoji/' : '/', // Set the base URL conditionally
  build: {
    cssCodeSplit: false,
    minify: 'terser',
  }
}))