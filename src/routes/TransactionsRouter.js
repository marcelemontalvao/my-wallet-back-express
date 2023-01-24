import express from "express"
import { getTransactions, postTransaction } from "../controllers/TransactionsController.js";
import { validateTransactionSchema } from "../middleware/SchemaValidation.js";
import { validateUser } from "../middleware/TransactionsMiddleware.js";

const transactionRouter = express.Router();

transactionRouter.post("/transactions", validateUser, validateTransactionSchema,  postTransaction)
transactionRouter.get("/transactions", validateUser,  getTransactions)

export default transactionRouter;