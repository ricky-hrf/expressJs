import express from 'express';
import { validation } from '../middlewares/validation.js';
import { postSchema, postIdSchema } from '../schemas/posts.js';
import { addPost, postById, deletePost, getPosts, updatePostById } from '../controllers/post.controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('halaman index');
});

router.get('/posts', getPosts);

// endpoint post untuk menambah data
router.post('/posts', validation({ body: postSchema }), addPost);

router.put('/posts/:id', validation({ params: postIdSchema, body: postSchema }), updatePostById);

router.delete('/posts/:id', validation({ params: postIdSchema }), deletePost);

router.get('/posts/:id', validation({ params: postIdSchema }), postById);

export default router;