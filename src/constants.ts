const env = {
  API_QUERY_KEY: import.meta.env.VITE_API_QUERY_KEY,
  API_QUERY_VALUE: import.meta.env.VITE_API_QUERY_VALUE,
} as const;

export { env };
