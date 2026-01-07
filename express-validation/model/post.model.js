import db from '../config/database.js';

export const insertPost = async (post) => {
  const sql = `INSERT INTO  posts (id, author, title, article, created_at) VALUES (?,?,?,?,?)`;

  await db.execute(sql, [
    post.id,
    post.author,
    post.title,
    post.article,
    post.created_at,
  ]);

  return post
}

export const findAllPosts = async () => {
  const [rows] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC');

  return rows;
}

export const findPostById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);

  return rows[0];
}

export const updatePostById = async (id, payload) => {
  const fields = [];
  const values = [];

  for (const key in payload) {
    fields.push(`${key} = ?`);
    values.push(payload[key]);
  }

  fields.push('update_at = ?');
  values.push(new Date());

  const sql = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;

  const [result] = await db.execute(sql, [...values, id]);

  return result.affectedRows;
}

export const deletePost = async (id) => {
  const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [id]);

  return result.affectedRows > 0;
};