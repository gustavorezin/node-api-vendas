declare namespace NodeJS {
  interface ProcessEnv {
    APP_SECRET: string;
    APP_API_URL: string;
    APP_WEB_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASS: string;
    MAIL_DRIVER: 'ethereal' | 'ses';
    STORAGE_DRIVER: 'disk' | 's3';
  }
}
