const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // User Model im models-Ordner

const router = express.Router();

// Eine Status-Route, um sicherzustellen, dass der Server läuft
router.get('/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Login-Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Benutzer in der Datenbank suchen
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Benutzer nicht gefunden' });
    }

    // Passwort vergleichen
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Falsches Passwort' });
    }

    // JWT erstellen, das die Benutzer-ID enthält
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

// Registrierung-Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Überprüfen, ob der Benutzer bereits existiert
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Benutzer existiert bereits' });
    }

    // Neues Benutzerobjekt erstellen
    user = new User({
      name,
      email,
      password
    });

    // Passwort verschlüsseln
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Benutzer in der Datenbank speichern
    await user.save();

    // JWT erstellen
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

module.exports = router;