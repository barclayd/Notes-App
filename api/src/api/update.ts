import { APIGatewayEvent, Context } from 'aws-lambda';
import { lambdaWrapper } from '../helpers/lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoDBService } from '../services/DynamoDBService';

export async function main(event: APIGatewayEvent, context: Context) {
  return await lambdaWrapper(event, context, async () => {
    const data = JSON.parse(event.body);
    const params: DocumentClient.UpdateItemInput = {
      TableName: process.env.tableName,
      Key: {
        userId: '123',
        noteId: event.pathParameters.id,
      },
      UpdateExpression: 'SET content = :content, attachment = :attachment',
      ExpressionAttributeValues: {
        ':attachment': data?.attachment || null,
        ':content': data?.content || null,
      },
      ReturnValues: 'ALL_NEW',
    };
    await dynamoDBService.update(params);
    return {
      status: true,
    };
  });
}
