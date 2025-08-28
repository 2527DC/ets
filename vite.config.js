import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // true binds to all available IPs, useful for testing on LAN
    port: 5174,
  },
  resolve:{
    alias:{
      '@': resolve(__dirname, './src'),
      '@features': resolve(__dirname, './src/redux/features'),
      '@logger': resolve(__dirname, './src/utils/logger'),

     
    }
  }
});

