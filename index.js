const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

app.post('/login', (req, res) => {
    console.log(req.body)
    res.send('<h1>backend lecture 2 - ojas karmarkar')
})

app.get('/', (req, res) => {
    res.send('welcome')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})