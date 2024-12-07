import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {port : 5174},
  rollupOptions: {
    external: process.env.VITE_BACKEND_URL === 'https://ecommerce-backend-29qk.onrender.com"' ? ['react-router-dom'] : []
  }
})
