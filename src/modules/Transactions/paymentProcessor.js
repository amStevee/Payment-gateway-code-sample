class PaymentProcessor {
  async initialize() {
    throw new Error("initialize() must be implemented");
  }

  async verify() {
    throw new Error("verify() must be implemented");
  }

  async refund() {
    throw new Error("refund() must be implemented");
  }
}

module.exports = PaymentProcessor;
