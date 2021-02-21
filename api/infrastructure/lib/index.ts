import DynamoDBStack from './DynamoDBStack';
import * as sst from '@serverless-stack/resources';
import S3Stack from './S3Stack';
import CognitoStack from './CognitoStack';

export default function main(app: sst.App): void {
  new DynamoDBStack(app, 'dynamodb');
  new S3Stack(app, 's3');
  new CognitoStack(app, 'cognito');
}
