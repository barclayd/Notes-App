import { expect, haveResource } from '@aws-cdk/assert';
import * as sst from '@serverless-stack/resources';
import DynamoDBStack from '../lib/DynamoDBStack';

describe('DynamoDBStack', () => {
  let stack: DynamoDBStack;

  beforeEach(() => {
    const app = new sst.App();
    stack = new DynamoDBStack(app, 'test-stack');
  });

  it('has the correct key schema', () => {
    expect(stack).to(
      haveResource('AWS::DynamoDB::Table', {
        KeySchema: [
          {
            AttributeName: 'userId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'noteId',
            KeyType: 'RANGE',
          },
        ],
      }),
    );
  });

  it('has the correct attribute definitions', () => {
    expect(stack).to(
      haveResource('AWS::DynamoDB::Table', {
        AttributeDefinitions: [
          {
            AttributeName: 'userId',
            AttributeType: 'S',
          },
          {
            AttributeName: 'noteId',
            AttributeType: 'S',
          },
        ],
      }),
    );
  });

  it('has PAY_PER_REQUEST billing mode', () => {
    expect(stack).to(
      haveResource('AWS::DynamoDB::Table', {
        BillingMode: 'PAY_PER_REQUEST',
      }),
    );
  });
});
