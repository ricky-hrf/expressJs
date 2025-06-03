const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_express_api'
});

connection.connect((err) => {
  if (err) {
    console.error("Error connection to Mysql", err);
    return;
  }
  console.log('Connected to the database successfully!');
})

module.exports = connection;