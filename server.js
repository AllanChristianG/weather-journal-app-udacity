const express = require('express');
const app = express();
const Server = require('http').Server;
const server = new Server(app);

const bearerToken = '4bf2928c6cab72dc536719d0a75eff85'

const port = 8080;

app.get('/', (req, res) => {
    res.send('hello')
})

server.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

