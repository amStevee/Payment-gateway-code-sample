const { validateRequestBody } = require("../../utils");
const TransactionService = require("./transaction.service");

async function createTransactionController(req, res, next) {
  try {
    validateRequestBody(req, res, next);

    const transaction = await TransactionService.createTransactionService(req.body);

    return res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
}
