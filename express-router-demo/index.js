import express from 'express';
import todoRoutes from './routes/todos.js';

const app = express();
const PORT = process.env.PORT || 3000;

// todo routes
app.use('/todos', todoRoutes);

// app.get('/todos', (req, res) => {
//   res.send('A list of todo items');
// })

// app.post('/todos', (req, res) => {
//   res.send('create a new todo item');
// });

// app.put('/todos/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(`update the todo item with id ${id}`);
// });

// app.delete('/todos/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(`delete the todo item with id ${id}`);
// });

// app.get('/todos/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(`get the todo item with id ${id}`);
// });

app.listen(PORT, () => {
  console.log(`The server has run on port http://localhost:${PORT}`);
});