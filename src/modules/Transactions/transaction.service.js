const TransactionRepo = require("./transactions.repository");

async function getTransactionByIdempotencyKey(idempotency_key) {
  const response = await TransactionRepo.getTransactionByIdempotencyKey(idempotency_key);
  return response;
}

async function createTransactionService(data) {
    const response = await TransactionRepo.createTransaction(data);
    return response;
}

module.exports = {
    getTransactionByIdempotencyKey,
    createTransactionService
}