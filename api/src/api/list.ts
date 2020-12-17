import { APIGatewayEvent, Context } from 'aws-lambda';
import { lambdaWrapper } from '../helpers/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoDBService } from '../services/DynamoDBService';

export async function main(event: APIGatewayEvent, context: Context) {
  return await lambdaWrapper(event, context, async () => {
    const params: DocumentClient.QueryInput = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': event.requestContext.identity.cognitoIdentityId,
      },
    };
    const result = await dynamoDBService.query(params);
    return result.Items;
  });
}
