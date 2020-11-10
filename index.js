const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app)

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log('Server started...');
});