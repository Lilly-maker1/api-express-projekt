const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Verbindung zur Postgres-Datenbank
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Tabelle beim Start erstellen falls nicht vorhanden
async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);
  console.log("Datenbank bereit");
}

// GET /users – alle User abrufen
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// POST /users – neuen User erstellen
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  res.status(201).json(result.rows[0]);
});

// DELETE /users/:id – User löschen
app.delete("/users/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
  res.json({ message: "User gelöscht" });
});

app.listen(3000, async () => {
  await init();
  console.log("API läuft auf http://localhost:3000");
});