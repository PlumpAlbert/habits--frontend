/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API endpoint */
  readonly VITE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
