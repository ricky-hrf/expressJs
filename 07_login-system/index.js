import express from 'express';
import userRoutes from './routes/user.routes.js';
import log from './middlewares/logger.js';
import cors from 'cors';
import AuthRouters from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors())
app.use(log); //untuk logging
app.use(express.json()); //untuk data JSON
app.use(express.urlencoded({ extended: true })); //untuk form

// routes
app.use('/', userRoutes);
app.use('/', AuthRouters);

app.listen(PORT, () => {
  console.log(`Server jalan di port http://localhost:${PORT}`);
})