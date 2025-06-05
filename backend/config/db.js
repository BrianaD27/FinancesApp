// File to Connect to Database
import {neon} from "@neondatabase/serverless"
// Does same as =>> import dotenv from "dotenv"; then dotenv.config() =>> in one line;
import "dotenv/config";  

// Creates a SQL connection using out DB URL 
export const sql = neon(process.env.DATABASE_URL);