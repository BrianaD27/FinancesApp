import express from "express";
import {
  deleteTransaction,
  getTransactionsByUserId,
  getTransactionSummary,
  createTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

//Lets us get data by user ID
router.get("/:userId", getTransactionsByUserId);

// API Endpoint for Posting Transactions
router.post("/", createTransaction);

// API Endpoint for Deleting Transactions
router.delete("/:id", deleteTransaction);

// API Endpoint for Transaction summary
router.get("/summary/:userId", getTransactionSummary);

export default router;
