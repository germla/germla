import { Stripe, loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('pk_test_12345');

