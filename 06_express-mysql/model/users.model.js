import db from '../config/database.js';

export const insertUser = async (user) => {
  const sql = `INSERT INTO users (id, fullname, email, password, address, created_at) VALUES (?, ?, ?, ?, ?, ?)`;

  await db.execute(sql, [
    user.id,
    user.fullname,
    user.email,
    user.password,
    user.address,
    user.created_at,
  ]);

  return user;
}

export const allUsers = async () => {
  const [data] = await db.execute('SELECT * FROM users ORDER BY created_at DESC');
  return data;
}

export const userById = async (id) => {
  const [row] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return row;
}

export const updateById = async (id, payload) => {
  const fields = [];
  const values = [];

  for (const key in payload) {
    fields.push(`${key} = ?`);
    values.push(payload[key]);
  }

  fields.push('updated_at = ?');
  values.push(new Date());

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  const [result] = await db.execute(sql, [...values, id]);

  return result.affectedRows;
}

export const deleteById = async (id) => {
  const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

  return result.affectedRows > 0;
}