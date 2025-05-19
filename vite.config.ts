import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = env.VITE_API_URL;
  const API_PORT = Number(env.VITE_API_PORT);

  return {
    plugins: [react()],
    base: '/top-history',
    server: {
      cors: true,
      port: API_PORT,
      proxy: {
        '/v1': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/package': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    preview: {
      cors: true,
      port: API_PORT,
      proxy: {
        '/v1': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/package': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
