import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {proxy: {
    '^/api': {
      target: 'https://5grlpjm3rihhg7ggddbfwfj46m0pxoai.lambda-url.us-east-1.on.aws',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    }
  }}
})
