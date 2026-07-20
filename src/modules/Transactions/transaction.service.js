const { prisma } = require("../../lib/prisma");
const { generateTransactionReference } = require("../../utils");
const TransactionRepository = require("./transactions.repository");

const transactionRepo = new TransactionRepository();

async function createTransactionService(data) {
  return prisma.$transaction(async (tx) => {
    const existingTransaction = await transactionRepo.findByIdempotencyKey(
      data.idempotencyKey,
      tx,
    );

    if (existingTransaction) {
      return existingTransaction;
    }

    const idempotency_key = generateIdempotencyKey();
    const reference = await generateUniqueReference();

    const response = await transactionRepo.createTransaction(
      { ...data, idempotency_key, reference },
      tx,
    );

    await transactionRepo.createHistory(data, tx);

    return response;
  });
}

// --------------------------------
async function getTransactionByIdempotencyKey(idempotency_key, tx) {
  const response = await transactionRepo.findByIdempotencyKey(
    idempotency_key,
    tx,
  );
  return response;
}

async function generateUniqueReference() {
  while (true) {
    const reference = generateTransactionReference();
    const exists = await transactionRepo.findByReference(reference);

    if (!exists) {
      return reference;
    }
  }
}

module.exports = {
  getTransactionByIdempotencyKey,
  createTransactionService,
};
