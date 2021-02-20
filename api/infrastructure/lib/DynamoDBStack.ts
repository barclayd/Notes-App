import { CfnOutput } from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sst from '@serverless-stack/resources';
import { App } from '@serverless-stack/resources';

export default class DynamoDBStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const app = scope.node.root as App;

    const table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      sortKey: {
        name: 'noteId',
        type: dynamodb.AttributeType.STRING,
      },
      partitionKey: {
        name: 'userId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    new CfnOutput(this, 'TableName', {
      value: table.tableName,
      exportName: app.logicalPrefixedName('TableName'),
    });

    new CfnOutput(this, 'TableArn', {
      value: table.tableArn,
      exportName: app.logicalPrefixedName('TableArn'),
    });
  }
}
