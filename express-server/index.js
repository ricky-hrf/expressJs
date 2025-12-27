import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  // res.send('hello world');
  // jika mengirim data dalam bentuk objek
  res.send({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});