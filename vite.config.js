import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // El bundle del servidor no necesita la carpeta public (la sirve dist/client).
    copyPublicDir: !isSsrBuild,
  },
}))
