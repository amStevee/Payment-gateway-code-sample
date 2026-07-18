-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PAYMENT', 'REFUND');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "owner_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "industry" VARCHAR NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "business_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "order_id" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "reference" VARCHAR(255),
    "idempotency_key" VARCHAR(255) NOT NULL,
    "gateway" VARCHAR(255) NOT NULL,
    "gatewayTransactionId" TEXT,
    "status" "TransactionStatus" NOT NULL,
    "type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_id_key" ON "Business"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_key" ON "Services"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_id_key" ON "Bookings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_service_id_key" ON "Bookings"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_customer_id_key" ON "Bookings"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_id_key" ON "Transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_reference_key" ON "Transactions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_idempotency_key_key" ON "Transactions"("idempotency_key");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
