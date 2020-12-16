import { dynamoDBService } from '../services/DynamoDBService';
import { LambdaService } from '../services/LambdaService';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { Lambda } from '../types/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export async function main(event: APIGatewayEvent, context: Context) {
  const lambda: Lambda = async ({ event, context }) => {
    const params: DocumentClient.GetItemInput = {
      TableName: process.env.tableName,
      Key: {
        userId: '123',
        noteId: event.pathParameters.id,
      },
    };
    const result = await dynamoDBService.get(params);
    if (!result.Item) {
      throw new Error('Item not found');
    }
    return result.Item;
  };
  return await new LambdaService(lambda, event, context).execute();
}
