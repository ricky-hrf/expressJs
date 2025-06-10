const db = require("../config/database")

// panggil semua pengguna
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// panggil user berdasarkan id
exports.getUser = (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
};

// menambah pengguna baru
exports.createUser = (req, res) => {
  const { nama, hp, email, joindate, alamat, bio, foto, role } = req.body;

  // validasi input
  if (!nama || !hp || !email) {
    return res.status(400).json({ message: "Nama, HP, and Email are required" });
  }

  // query untuk menambah pengguna
  db.query(
    "INSERT INTO users (nama, hp, email, joindate, alamat, bio, foto, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [nama, hp, email, joindate, alamat, bio, foto, role],
    (err, results) => {
      // handel error duplikasi
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email sudah digunakan" });
        }
        return res.status(500).json({ message: err.message });
      }

      // jika berhasil, kembalikan data pengguna yang baru dibuat
      res.status(201).json({
        message: "Pengguna baru berhasil dibuat",
        userId: results.insertId,
      });
    }
  );
}