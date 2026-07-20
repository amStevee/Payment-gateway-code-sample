const PaymentProcessor = require("../Transactions/paymentProcessor");

class StripeProcessor extends PaymentProcessor {
  constructor(stripeClient) {
    super();
    this.stripe = stripeClient;
  }

  async initializePayment(transaction) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: transaction.amount,
      currency: transaction.currency,
      receipt_email: transaction.email,
      metadata: {
        transactionId: transaction.id,
        reference: transaction.reference,
        orderId: transaction.order_id,
      },
    });

    return paymentIntent
  }

  async verify(paymentIntentId) {
    const paymentIntent =
      await this.stripe.paymentIntent.retrieve(paymentIntentId);

    return paymentIntent;
  }

  async refund(paymentIntentId) {
    const refund = await this.stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    return refund;
  }
}

module.exports = StripeProcessor;
