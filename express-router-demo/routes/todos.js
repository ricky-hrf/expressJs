import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`halaman index`);
});

router.get('/todos', (req, res) => {
  res.send('A list of todo item');
});

router.post('/todos', (req, res) => {
  res.send('create a new todo item');
});

router.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`update the todo item with id ${id}`);
});

router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`delete the todo item with id ${id}`);
});

router.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`get the todo item with id ${id}`);
});

export default router;