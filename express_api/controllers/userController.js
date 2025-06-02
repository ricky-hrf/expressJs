const { Result } = require("express-validator")
const db = require("../config/database")

// panggil semua pengguna
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// panggul uses berdasarkan id