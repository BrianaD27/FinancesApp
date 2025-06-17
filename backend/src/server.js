import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoutes from "./routes/transactionsRoutes.js";

dotenv.config();
const app = express();

//Built in Middleware
app.use(rateLimiter);
app.use(express.json());

//Custom Middleware example app.use always for middleware
// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is: ", req.method);
//   next();
// })

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.send("It's Working!");
});

// Mount router middleware for transaction-related endpoints
app.use("/api/transactions", transactionRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
  });
});
