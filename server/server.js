const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const { createPlayer, movePlayer } = require('./game/player');
const { createTeam } = require('./game/team');
const connectDB = require('../database');  // Verbindung zur Datenbank im Hauptverzeichnis

require('dotenv').config({ path: '../.env' });  // .env-Datei im Hauptverzeichnis laden

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Stellt die Verbindung zur MongoDB her
connectDB();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// API-Routen
const routes = require('./routes');  // Routen im gleichen Verzeichnis wie der Server
app.use('/api', routes);