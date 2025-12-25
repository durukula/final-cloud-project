const express = require("express");
const app = express();

const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error", err));


const port = process.env.PORT || 3000;

app.get("/hello", async (req, res) => {
  try {
    await client.query("SELECT 1");
    res.json({
      message: "Hello from Node.js app!",
      db: "connected",
    });
  } catch (err) {
    res.status(500).json({
      message: "DB connection failed",
      error: err.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
