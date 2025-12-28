export const todos = [
  { id: 1, title: 'Learn Node.js', completed: true },
  { id: 2, title: 'Master Express', completed: false },
  { id: 3, title: 'Build an API Server', completed: false },
];

export const nextTodoId = () => {
  // get the next id for the todo
  let maxId = 1;
  todos.forEach((todo) => {
    if (todo.id > maxId) {
      maxId = todo.id;
    }
  });

  return maxId + 1;
}