export interface AWSAmplifyConfig {
  mandatorySignIn: boolean,
  endpointName: string;
  s3: {
    region: string;
    bucket: string;
  };
  apiGateway: {
    region: string;
    url: string;
  };
  cognito: {
    region: string;
    userPoolId: string;
    appClientId: string;
    identityPoolId: string;
  };
}

export const config: AWSAmplifyConfig = {
  mandatorySignIn: true,
  endpointName: 'notes',
  s3: {
    region: process.env.AWS_REGION,
    bucket: process.env.S3_UPLOAD_BUCKET,
  },
  apiGateway: {
    region: process.env.AWS_REGION,
    url: process.env.API_GATEWAY_URL,
  },
  cognito: {
    region: process.env.AWS_REGION,
    userPoolId: process.env.USER_POOL_ID,
    appClientId: process.env.APP_CLIENT_ID,
    identityPoolId: process.env.IDENTITY_POOL_ID,
  },
};
