/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_PORT: string;
  readonly VITE_API_QUERY_KEY: string;
  readonly VITE_API_QUERY_VALUE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
