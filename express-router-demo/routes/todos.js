import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('A list of todo item');
});

router.post('/', (req, res) => {
  res.send('create a new todo item');
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`update the todo item with id ${id}`);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`delete the todo item with id ${id}`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`get the todo item with id ${id}`);
});

export default router;