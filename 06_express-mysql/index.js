import express from 'express';
import userRoutes from './routes/user.routes.js';
import log from './middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(log); //untuk logging
app.use(express.json()); //untuk data JSON
app.use(express.urlencoded({ extended: true })); //untuk form

// routes
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server jalan di port http://localhost:${PORT}`);
})