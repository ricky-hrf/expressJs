import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootd@tabAse123',
  database: 'db_myschool',
  waitForConnections: true,
})

export default db;