import { dynamoDBService } from '../services/DynamoDBService';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { lambdaWrapper } from '../helpers/lambda';

export async function main(event: APIGatewayEvent, context: Context) {
  return await lambdaWrapper(event, context, async () => {
    const params: DocumentClient.GetItemInput = {
      TableName: process.env.TABLE_NAME,
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id,
      },
    };
    const result = await dynamoDBService.get(params);
    if (!result.Item) {
      throw new Error('Item not found');
    }
    return result.Item;
  });
}
