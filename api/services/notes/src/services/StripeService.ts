import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(secretKey = process.env.STRIPE_SECRET_KEY) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2020-08-27',
    });
  }

  public async create(amount?: number, description?: string, source?: string) {
    await this.stripe.charges.create({
      amount,
      description,
      source,
      currency: 'gbp',
    });
  }
}

export const stripeService = new StripeService();
