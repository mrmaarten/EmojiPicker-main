import './app.css'
import App from './App.svelte'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
})

const app = new App({
  target: document.getElementById('app'),
})

updateSW()

export default app