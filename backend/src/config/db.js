// File to Connect to Database
import {neon} from "@neondatabase/serverless"
// Does same as =>> import dotenv from "dotenv"; then dotenv.config() =>> in one line;
import "dotenv/config"; 

// Creates a SQL connection using out DB URL 
export const sql = neon(process.env.DATABASE_URL);

// Initialized Database and connected to it
export async function initDB() {
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