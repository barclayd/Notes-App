import { Amplify } from 'aws-amplify';
import { AWSAmplifyConfig, config } from '../config';

export class AWSAmplifyService {
  constructor(private awsConfig: AWSAmplifyConfig = config) {}

  public setup() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: this.awsConfig.cognito.region,
        userPoolId: this.awsConfig.cognito.userPoolId,
        identityPoolId: this.awsConfig.cognito.identityPoolId,
        userPoolWebClientId: this.awsConfig.cognito.appClientId,
      },
      Storage: {
        region: this.awsConfig.s3.region,
        bucket: this.awsConfig.s3.bucket,
        identityPoolId: this.awsConfig.cognito.identityPoolId,
      },
      API: {
        endpoints: [
          {
            name: this.awsConfig.endpointName,
            endpoint: this.awsConfig.apiGateway.url,
            region: this.awsConfig.apiGateway.region,
          },
        ],
      },
    });
  }
}
