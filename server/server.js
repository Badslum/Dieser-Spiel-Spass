const express = require('express');
const http = require('http'); 
const socketIo = require('socket.io');
<<<<<<< HEAD
const mongoose = require('mongoose');
const { createPlayer, movePlayer } = require('./game/player');
const { createTeam } = require('./game/team');
const connectDB = require('../database');  // Verbindung zur Datenbank im Hauptverzeichnis

require('dotenv').config({ path: '../.env' });  // .env-Datei im Hauptverzeichnis laden
=======
const { createPlayer, movePlayer } = require('./game/player');
const { createTeam } = require('./game/team');
>>>>>>> 40c9f94b97e09837f32932d1a832e2a08253f71c

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware zum Parsen von JSON-Daten im Body
app.use(express.json());  // Füge dies hinzu, damit JSON-Daten verarbeitet werden können

// Stellt die Verbindung zur MongoDB her
connectDB();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

<<<<<<< HEAD
// API-Routen
const routes = require('./routes');  // Routen im gleichen Verzeichnis wie der Server
app.use('/api', routes);
=======
const routes = require('./routes');
app.use('/api', routes);

module.exports = io;
>>>>>>> 40c9f94b97e09837f32932d1a832e2a08253f71c
