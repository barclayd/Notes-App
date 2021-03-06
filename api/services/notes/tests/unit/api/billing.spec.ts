import { APIGatewayEvent, Context } from 'aws-lambda';
import mockBilling from '../../mocks/billing-event.json';
import { main as billingLambda } from '../../../src/api/billing';

describe('Billing Lambda', () => {
  it('returns a 200 status code when passed valid data', async () => {
    const event = { body: mockBilling.body } as APIGatewayEvent;
    const context = {} as Context;
    const response = await billingLambda(event, context);

    expect(response.statusCode).toEqual(200);
  });

  it('returns the correct body when passed valid data', async () => {
    const event = { body: mockBilling.body } as APIGatewayEvent;
    const context = {} as Context;

    const response = await billingLambda(event, context);
    const responseBody = JSON.parse(response.body as string);
    expect(responseBody).toEqual({
      status: true,
    });
  });
});
