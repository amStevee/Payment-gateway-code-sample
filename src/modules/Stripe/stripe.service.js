const { stripe } = require("../../lib/stripe");

export async function initializePayment({ amount, currency, idempotency_key }) {
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount,
      currency,
      automatic_payment_methods: {
        enable: true,
      },
    },
    {
      idempotency_key,
    },
  );

  return paymentIntent;
}
