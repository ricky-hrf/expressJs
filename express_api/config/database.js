const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_express_api'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database successfully!');
})

module.exports = connection;