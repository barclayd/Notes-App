import { APIGatewayEvent, Context } from 'aws-lambda';
import mockLists from '../../mocks/list-event.json';
import { main as listLambda } from '../../../src/api/list';

describe('List Lambda', () => {
  it('returns a 200 status code when passed valid data', async () => {
    const event = {
      requestContext: mockLists.requestContext,
    } as APIGatewayEvent;
    const context = mockLists.requestContext as Context;
    const response = await listLambda(event, context);

    expect(response.statusCode).toEqual(200);
  });

  it('returns the correct headers when passed valid data', async () => {
    const event = {
      requestContext: mockLists.requestContext,
    } as APIGatewayEvent;
    const context = mockLists.requestContext as Context;

    const response = await listLambda(event, context);
    const expectedHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };

    expect(response.headers).toEqual(expectedHeaders);
  });
});
