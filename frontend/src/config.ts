export interface AWSAmplifyConfig {
  mandatorySignIn: boolean;
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
    region: process.env.REACT_APP_AWS_REGION,
    bucket: process.env.REACT_APP_S3_UPLOAD_BUCKET,
  },
  apiGateway: {
    region: process.env.REACT_APP_AWS_REGION,
    url: process.env.REACT_APP_API_GATEWAY_URL,
  },
  cognito: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    appClientId: process.env.REACT_APP_APP_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};
