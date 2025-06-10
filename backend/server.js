import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

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

// Initialized Database and connected to it
async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    // DECIMAL(10,2)
    // means: fixed point number with 10 digits IN TOTAL
    //        and 2 digits after decimal place
    // therefore: Max value can only hold 8 digits

    console.log("Database created");
  } catch (error) {
    console.log("Error Creating Database: ", error);
    process.exit(1); // status code 1 = fail, 0 = success
  }
}

// Runs after Custom Middleware example
// app.get("/", (req, res) => {
//   res.send("It's Working!!!!");
// });

//Lets us get data by user ID
app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const {userId} = req.params;
    
    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    res.status(200).json(transactions);

  } catch (error) {
    console.log("Error getting the transaction: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Endpoint for Posting Transactions
app.post("/api/transactions", async (req, res) => {
  // title, amount, category, user_id (Date is automatically created)
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;
    console.log(transaction[0]);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transaction: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Endpoint for Deleting Transactions
app.delete("/api/transactions/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(parseInt(id))) {
        res.status(400).json({message: "Invalid Transaction Id"})
      }

      const deleted = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
      `

      if (deleted.length == 0) {
        res.status(404).json({message: "Sorry. Transaction not found :("})
      }

      res.status(200).json(deleted);

    } catch (error) {
      console.log("Error deleting the transaction: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
})

// API Endpoint for Transaction summary 
app.get("/api/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (isNaN(parseInt(userId))) {
      res.status(404).json({ message: "Invalid user id"})
    }

    // Find total sum of all amounts from a certain user and assign the total the variable
    // name 'balance'. Coalesce forces the amount to be 0 if user has no previous transactions
    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance 
      FROM transactions 
      WHERE user_id = ${userId}
    `

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income 
      FROM transactions 
      WHERE user_id = ${userId} AND amount > 0
    `

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses 
      FROM transactions 
      WHERE user_id = ${userId} AND amount < 0
    `

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses
    })

  } catch (error) {
    console.log("Error getting the transaction summary: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
  });
});
