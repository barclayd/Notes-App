import DynamoDBStack from './DynamoDBStack';
import * as sst from '@serverless-stack/resources';

export default function main(app: sst.App): void {
  new DynamoDBStack(app, 'dynamodb');
}
