import express from 'express';
import todoRoutes from './routes/todos.js';
import log from './middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(log);

// todo routes
app.use('/', todoRoutes);

app.listen(PORT, () => {
  console.log(`The server has run on port http://localhost:${PORT}`);
});