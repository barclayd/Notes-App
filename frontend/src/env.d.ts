declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION: string;
      S3_UPLOAD_BUCKET: string;
      API_GATEWAY_URL: string;
      USER_POOL_ID: string;
      APP_CLIENT_ID: string;
      IDENTITY_POOL_ID: string;
    }
  }
}

export {};
