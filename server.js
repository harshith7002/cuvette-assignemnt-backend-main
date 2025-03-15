const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jobs_db",
  password: "sairam",
  port: 5432, // Default PostgreSQL port
});

// Middleware to parse JSON
app.use(express.json());

// 🟢 Job Search API
app.get("/jobs", async (req, res) => {
  try {
    const { title, location } = req.query;
    let query = "SELECT * FROM jobs WHERE 1=1"; 
    let values = [];

    if (title) {
      query += " AND LOWER(title) LIKE LOWER($1)";
      values.push(`%${title}%`);
    }
    if (location) {
      query += " AND LOWER(location) LIKE LOWER($2)";
      values.push(`%${location}%`);
    }

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
