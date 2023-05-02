const app = require('./app');
const http = require('http');
const connectToDB = require('./db');
const port = 3000;
connectToDB();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});