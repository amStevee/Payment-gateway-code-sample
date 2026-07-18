const { validateRequestBody } = require("../../utils");
const TransactionService = require("./transaction.service");

async function createTransactionController(req, res, next) {
  try {
    validateRequestBody(req, res, next);

    const existingTransaction =
      await TransactionService.getTransactionByIdempotencyKey(
        req.body.idempotencyKey,
      );

    if (existingTransaction) {
      return res.status(200).json(existingTransaction);
    }

    const { user_id, order_id, amount, currency } = req.body;

    const idempotency_key = generateIdempotencyKey();

    const transaction = await TransactionService.createTransactionService({
      user_id: user_id,
      order_id: order_id,
      amount: amount,
      currency: currency,
      status: "pending",
      gateway: "stripe",
      type: "payment",
      idempotency_key,
    });

    
  } catch (error) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
}
