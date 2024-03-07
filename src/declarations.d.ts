declare module 'virtual:pwa-register' {
    export function registerSW(options?: {
        immediate?: boolean
        onNeedRefresh?: () => void
        onOfflineReady?: () => void
    }): () => Promise<void>
}