import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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

// Sends or requests info from localhost:5001/(first parameter)
app.get("/", (request, response) => {
  response.send("It's working!!!!");
});

console.log("my port: ", PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
  });
});
