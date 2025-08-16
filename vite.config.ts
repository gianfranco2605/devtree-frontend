import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '@mapbox/node-pre-gyp',
        'mock-aws-s3',
        'aws-sdk',
        'nock'
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      'mock-aws-s3',
      'aws-sdk',
      'nock',
      '@mapbox/node-pre-gyp'
    ]
  }
})
