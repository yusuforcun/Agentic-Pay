import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Bu ayar "Dışarıya açıl" demektir
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true // Windows dosya sistemi hatasını çözer
    }
  }
})