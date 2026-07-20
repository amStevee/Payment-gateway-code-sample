const stripeClient = require("../../lib/stripe");
const StripeProcessor = require("../Stripe/stripeProcessor.js");
const stripeProsessor = require("../Stripe/stripeProcessor.js");

const processors = {
  stripe: () => new StripeProcessor(stripeClient),
};

function createProcessor(provider) {
  const processorFactory = processors[provider];

  if (!processorFactory) {
    throw new Error(`Unsupported payment procider: ${provider}`);
  }

  return processorFactory();
}

module.exports = createProcessor;
