import { Amplify, Auth } from 'aws-amplify';
import { AWSAmplifyConfig, config } from '../config';

export class AmplifyService {
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

  public async login(
    email: string,
    password: string,
    onLogin: () => void,
    onError: () => void,
  ) {
    try {
      await Auth.signIn(email, password);
      onLogin();
    } catch (error) {
      alert(`Login error: ${error.message}`);
      onError();
    }
  }

  public async signUp(
    email: string,
    password: string,
    onSignUp: () => void,
    onError: () => void,
  ) {
    try {
      await Auth.signUp({ username: email, password: password });
      onSignUp();
    } catch (error) {
      alert(`Sign up error: ${error.message}`);
      onError();
    }
  }

  public async confirmSignUp(
    email: string,
    password: string,
    passcode: string,
    onConfirmSignUp: () => void,
    onError: () => void,
  ) {
    try {
      await Auth.confirmSignUp(email, passcode);
      await this.login(email, password, onConfirmSignUp, () => {
        throw new Error('Error logging into account');
      });
    } catch (error) {
      alert(`Sign up error: ${error.message}`);
      onError();
    }
  }

  public async validateSession(
    onCurrentUser: () => void,
    onComplete: () => void,
  ) {
    try {
      await Auth.currentSession();
      onCurrentUser();
    } catch (error) {
      if (error !== 'No current user') {
        alert(error);
      }
    }
    onComplete();
  }

  public async logout() {
    await Auth.signOut();
  }
}
