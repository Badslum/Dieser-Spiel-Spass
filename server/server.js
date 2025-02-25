const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=> { console.log("Server is running on port 8000"); });

module.exports = io;

const routes = require('./routes');
app.use('/api', routes);