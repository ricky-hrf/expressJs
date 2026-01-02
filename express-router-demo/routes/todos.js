import express from 'express';
import posts from '../data/posts.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('halaman index');
});

router.get('/posts', (req, res) => {
  res.send(posts);
});

// endpoint post untuk menambah data
router.post('/posts', (req, res) => {
  const { author, created_at, title, article } = req.body;

  // object untuk data baru
  const newPost = {
    id: posts.length + 1,
    author,
    created_at,
    title,
    article,
  }

  // menambahkan objek baru ke dalam array post
  posts.push(newPost);

  // pesan keberhasilan
  res.status(201).json({
    message: 'postingan baru berhasil ditambahkan',
    data: newPost,
  });

});

router.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`update the todo item with id ${id}`);
});

router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`delete the todo item with id ${id}`);
});

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  // validasi jika id yang dicari tidak sesuai format integer
  const postId = parseInt(id);
  if (isNaN(postId)) {
    res.status(400).send(`Invalid id ${id}`);
  }

  // data yang tampil berdasarkan id
  const post = posts.find((post) => post.id === postId);

  if (post) res.status(200).send(post);

  // untuk validasi jika id yang dicari tidak ada
  res.status(404).send(`post with id ${id} not found`)
});

export default router;