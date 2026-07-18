const prisma = require("../../lib/prisma").prisma;

async function getTransactionByIdempotencyKey(idempotency_key) {
  const response = await prisma.transaction.findUnique({
    where: {
      idempotency_key,
    },
  });
  return response;
}

async function createTransaction(data) {
  const response = await prisma.transaction.create({
    data,
  });
  return response;
}

async function updateTransaction(id, data) {
  const response = await prisma.transaction.update({
    where: {
      id,
    },
    data,
  });
}

module.exports = {
  createTransaction,
  getTransactionByIdempotencyKey,
};
