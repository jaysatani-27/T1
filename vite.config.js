import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      input: 'src/index.jsx', // Adjust this to your entry file
    },
  },
  plugins: [react()],
})
