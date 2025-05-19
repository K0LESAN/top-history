const env = {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  API_URL: import.meta.env.VITE_API_URL,
  API_PORT: import.meta.env.VITE_API_PORT,
  API_QUERY_KEY: import.meta.env.VITE_API_QUERY_KEY,
  API_QUERY_VALUE: import.meta.env.VITE_API_QUERY_VALUE,
} as const;

export { env };
