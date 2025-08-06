const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")

const app = express();
app.use(cors());
const db = mysql.createConnection({
  host: "mysql-db",
  user: "root",
  password: "meinpasswort",
  database: "platzhalter",
});

db.connect((err) => {
  if (err) {
    console.error("Fehler bei Verbindung:", err);
  } else {
    console.log("Mit MySQL verbunden!");
  }
});

app.post("/add", (req, res) => {
  const sql = "INSERT INTO messages (text) VALUES (?)";
  const msg = `Zugriff am ${new Date().toISOString()}`;
  db.query(sql, [msg], (err) => {
    if (err) return res.send("Fehler");
    res.send("Gespeichert");
  });
});

app.get("/all", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) return res.send("Fehler");
    res.json(results);
  });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));