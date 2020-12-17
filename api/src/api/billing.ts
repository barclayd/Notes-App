import { APIGatewayEvent, Context } from 'aws-lambda';
import { lambdaWrapper } from '../helpers/lambda';
import { PriceService } from '../services/PriceService';
import { stripeService } from '../services/StripeService';

export async function main(event: APIGatewayEvent, context: Context) {
  return await lambdaWrapper(event, context, async () => {
    const { storage, source } = JSON.parse(event.body);
    const cost = new PriceService(storage).priceInPennies();
    const description = 'Notes charge';

    await stripeService.create(cost, description, source);

    return {
      status: true,
    };
  });
}
