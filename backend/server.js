import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Sends or requests info from localhost:5001/(first parameter)
app.get("/", (request, response) => {
    response.send("It's working!!!!");
});

console.log("my port: ", process.env.PORT);

app.listen(5001, () => {
    console.log("Server is running on PORT: 5001");
});