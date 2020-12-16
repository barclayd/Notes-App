import { v4 as uuid } from 'uuid';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoDBService } from '../services/DynamoDBService';
import { lambdaWrapper } from '../helpers/lambda';

export async function main(event: APIGatewayEvent, context: Context) {
  return await lambdaWrapper(event, context, async () => {
    const data = JSON.parse(event.body);

    const params: DocumentClient.PutItemInput = {
      TableName: process.env.tableName,
      Item: {
        userId: '123',
        noteId: uuid(),
        content: data.content,
        attachment: data.attachment,
        createdAt: Date.now(),
      },
    };
    await dynamoDBService.put(params);
    return params.Item;
  });
}
