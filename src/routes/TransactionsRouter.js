import express from "express"
import { getTransactions, postTransaction } from "../controllers/TransactionsController.js";
import { validateTransactionSchema } from "../middleware/SchemaValidation.js";

const transactionRouter = express.Router();

transactionRouter.post("/transactions", validateTransactionSchema, postTransaction)
transactionRouter.get("/transactions", getTransactions)

export default transactionRouter;