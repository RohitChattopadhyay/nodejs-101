const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app)

const PORT = 3000;

app.get('/', (req, res) => {
    const client_ip = req.ip
    console.log(client_ip)
    res.send('<h1>Hello ' + client_ip + '</h1>');
});

server.listen(PORT, () => {
  console.log('Server started...');
});