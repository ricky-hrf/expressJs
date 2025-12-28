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

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`)
})