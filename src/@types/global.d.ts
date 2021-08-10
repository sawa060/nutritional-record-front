/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly BASE_URL: string;
    readonly ADMIN_BASE_URL: string;
  }
}
