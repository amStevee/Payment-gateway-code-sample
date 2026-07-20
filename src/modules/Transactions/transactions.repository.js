class TransactionRepository {
  async findByIdempotencyKey(idempotency_key, tx = prisma) {
    const response = await tx.transactions.findUnique({
      where: {
        idempotency_key,
      },
    });
    return response;
  }

  async findByReference(reference, tx = prisma) {
    const response = await tx.transactions.findUnique({
      where: {
        reference,
      },
    });
  }

  async createTransaction(data, tx = prisma) {
    const response = await tx.transactions.create({
      data,
    });
    return response;
  }

  async createHistory(data, tx = prisma) {
    const response = await tx.Transaction_status_history.create({
      data,
    });
  }

  async updateTransaction(id, data, tx = prisma) {
    const response = await tx.transactions.update({
      where: {
        id,
      },
      data,
    });
  }
}

module.exports = TransactionRepository;
