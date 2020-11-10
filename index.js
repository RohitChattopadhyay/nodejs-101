const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')

const app = express();
const server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: false }))

const PORT = 3000;
const msgs = {
    // room_id : [ messages ]
}

app.get('/', (req, res) => {
    const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let html_res = "<h1>Hello " + client_ip + '</h1><h3>Available Rooms</h3>'
    for(let room in msgs)
        html_res += "<a href=/room/" + room + ">" + room + "</a><br>";
    res.send(html_res);
});

app.get('/room/:room_id', (req, res) => {
    const room_id = req.params.room_id
    if (!(room_id in msgs))
        msgs[room_id] = ["Welcome to new room"]
    res.sendFile(__dirname + '/ui.html');
});

app.post('/room/:room_id', (req, res) => {
    const room_id = req.params.room_id
    const message = req.body.msg
    const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(room_id, client_ip, message)
    if (!(room_id in msgs))
        msgs[room_id] = ["Welcome to new room"]
    msgs[room_id].push(client_ip + " > " + message)
    res.sendFile(__dirname + '/ui.html');
});

app.get('/room/:room_id/messages', (req, res) => {
    const room_id = req.params.room_id
    res.json(msgs[room_id])
});

server.listen(PORT, () => {
    console.log('Server started...');
});