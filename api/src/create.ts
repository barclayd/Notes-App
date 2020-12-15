import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayEvent, context: Context) {
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

  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
