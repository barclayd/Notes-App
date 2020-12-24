declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_AWS_REGION: string;
      REACT_APP_S3_UPLOAD_BUCKET: string;
      REACT_APP_API_GATEWAY_URL: string;
      REACT_APP_USER_POOL_ID: string;
      REACT_APP_APP_CLIENT_ID: string;
      REACT_APP_IDENTITY_POOL_ID: string;
    }
  }
}

export {};
