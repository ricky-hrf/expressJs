const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
const userRoutes = require("./routes/users");
const db = require("./config/database")
const app = express()
const port = 3000

// middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import route posts
const postsRouter = require('./routes/posts')
app.use('/api/posts', postsRouter);

// import route users
app.use("/api/users", userRoutes);

// server lisetener
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});