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

router.put('/posts/:id', (req, res) => {
  // const { id } = req.params;
  // mengubah id jadi integer secara langsung dan efesien
  const id = parseInt(req.params.id);
  const { title } = req.body;

  // cari index todo
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({
      message: 'postingan tidak ditemukan'
    });
  }

  // update data
  posts[postIndex].title = title;

  res.json({
    message: 'Todo berhasil diupdate',
    data: posts[postIndex]
  });
});

// terkadang yang dirubah itu satu per satu, untuk kasus ini kita bisa pakai method PATCH
router.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const update = req.body;

  const postId = parseInt(id);
  if (isNaN(postId)) {
    res.status(400).send(`Invalid id ${id}`);
  }

  const post = posts.find(post => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: 'postingan tidak ditemukan'
    });
  }

  // update data secara dinamis
  Object.keys(update).forEach(key => {
    if (key !== 'id') {
      post[key] = update[key];
    }
  });

  res.json({
    message: 'postingan berhasil diubah',
    data: post
  });
});

router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  const postId = parseInt(id);
  if (isNaN(postId)) {
    res.status(400).send(`id tidak valid ${id}`);
  }

  // mencari data yang ingin dihapus berdasarkan id
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({
      message: 'postingan tidak ditemukan'
    });
  }

  const deletePost = posts.slice(postIndex, 1);

  res.json({
    message: `delete the todo item with id ${id}`,
    data: deletePost[0]
  });
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