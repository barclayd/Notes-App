import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

class DynamoDBService {
  constructor(
    private client: DocumentClient = new AWS.DynamoDB.DocumentClient(),
  ) {}

  public async get(params: DocumentClient.GetItemInput) {
    await this.client.get(params).promise();
  }

  public async put(params: DocumentClient.PutItemInput) {
    await this.client.put(params).promise();
  }

  public async query(params: DocumentClient.QueryInput) {
    await this.client.query(params).promise();
  }

  public async update(params: DocumentClient.UpdateItemInput) {
    await this.client.update(params).promise();
  }

  public async delete(params: DocumentClient.DeleteItemInput) {
    await this.client.delete(params).promise();
  }
}

export const dynamoDBService = new DynamoDBService();
