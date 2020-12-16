import { APIGatewayEvent, Context } from 'aws-lambda';
import { lambdaWrapper } from '../helpers/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoDBService } from '../services/DynamoDBService';

export async function main(event: APIGatewayEvent, context: Context) {
  return await lambdaWrapper(event, context, async () => {
    const params: DocumentClient.DeleteItemInput = {
      TableName: process.env.tableName,
      Key: {
        userId: '123',
        noteId: event.pathParameters.id,
      },
    };

    await dynamoDBService.delete(params);
    return {
      status: true,
    };
  });
}
