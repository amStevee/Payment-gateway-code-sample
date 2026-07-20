const crypto = require("node:crypto");

class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}

function validateRequestBody(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        statusCode: 400,
        message: "Invalid request body",
      },
    });
  }
  next();
}

function generateIdempotencyKey() {
  return crypto.randomUUID();
}

function generateTransactionReference() {
  const date = new Date();

  const yyy = date.getFullYear();

  const mm = String(date.getMonrh() + 1).padStart(2, "0");

  const dd = String(date.getDate()).padStart(2, "0");

  const random = crypto
    .randomBytes(4)
    .toString("base64")
    .replace(/[^A-Z0-9]/gi, "")
    .substring(0, 6)
    .toUpperCase();

  return `TNX-${yyy}${mm}${dd}-${random}`;
}

export {
  errorMiddleware,
  CustomError,
  validateRequestBody,
  generateIdempotencyKey,
  generateTransactionReference,
};
