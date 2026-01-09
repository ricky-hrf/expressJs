import express from 'express';
import { validation } from '../middlewares/validation.js';
import { userIdSchema, userSchema } from '../schemas/user.schema.js';
import { addUser, allUsers, userById, updateById, deleteById } from '../controllers/users.controllers.js';

const router = express.Router();

// router halaman utama
router.get('/', (req, res) => {
  res.send({ message: 'hello world' });
});

// router CREATE data
router.post('/users', validation({ body: userSchema }), addUser);

// router READ data
router.get('/users', allUsers);

// router READ data BY ID
router.get('/users/:id', validation({ params: userIdSchema }), userById);

// router UPDATE data BY ID
router.put('/users/:id', validation({ body: userSchema, params: userIdSchema }), updateById);

// router DELETE data BY ID
router.delete('/users/:id', validation({ params: userIdSchema }), deleteById);

export default router;