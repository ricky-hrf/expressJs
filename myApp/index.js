const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('ahihih')
})

// method dengan perameter
app.get('/users/:userId', (req, res) => {
  res.send(req.params)
})

// random text
app.get('/random.text', (req, res) => {
  res.send('random.text')
})

// method post atau mengirim data melalui route
app.post('/kirim', (req, res) => {
  res.send('sudah bisa buat post')
})

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})