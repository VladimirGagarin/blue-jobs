import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  base: mode === "production" ? "/blue-jobs" : "/",
    outDir: {
      build
    }
  plugins: [react()],
})
