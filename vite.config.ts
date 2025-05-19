import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: '/top-history',
  server: {
    cors: true,
    port: Number(process.env.API_PORT),
    proxy: {
      '/v1': {
        target: process.env.API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/package': {
        target: process.env.API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    cors: true,
    port: Number(process.env.API_PORT),
    proxy: {
      '/v1': {
        target: process.env.API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/package': {
        target: process.env.API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
