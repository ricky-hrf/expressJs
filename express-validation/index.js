import express from 'express';
import postsRoutes from './routes/postsRoutes.js';
import log from './middlewares/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(log);

// middleware untuk membaca body
app.use(express.json()); //untuk data JSON
app.use(express.urlencoded({ extended: true })); //untuk form

// todo routes
app.use('/', postsRoutes);


app.listen(PORT, () => {
  console.log(`The server has run on port http://localhost:${PORT}`);
});