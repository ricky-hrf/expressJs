import express from 'express';
import { todos, nextTodoId } from './todos.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/todos/', (req, res) => {
  // res.send(todos);
  if (req?.query?.completed) {
    const isCompleted = req.query.completed === "true";
    const filterTodos = todos.filter((todo) => {
      return todo.completed === isCompleted
    }
    );
    res.send(filterTodos);
  }

  res.send(todos);
})

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  const todoId = parseInt(id);
  if (isNaN(todoId)) {
    res.status(400).send(`Invalid id ${id}`);
  }

  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) res.status(200).send(todo);

  res.status(404).send(`Todo with id ${id} not found`);
});

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`)
})