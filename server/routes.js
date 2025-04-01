const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Registrierungsroute
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Überprüfen, ob der Benutzername bereits existiert
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Benutzername bereits vergeben' });
    }

    // Neues Benutzerobjekt erstellen
    user = new User({
      username,
      password
    });

    // Passwort verschlüsseln
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Benutzer in der Datenbank speichern
    await user.save();

    // JWT erstellen
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Token zurückgeben
    res.status(200).json({ message: 'Registrierung erfolgreich', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

// Login-Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Benutzer anhand des Benutzernamens finden
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Benutzer nicht gefunden' });
    }

    // Passwort überprüfen
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Ungültiges Passwort' });
    }

    // JWT erstellen
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Token zurückgeben
    res.status(200).json({ message: 'Erfolgreich eingeloggt', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

// Gastzugangsroute (direkt mit JWT erstellen)
router.post('/guest', (req, res) => {
  // Ein Gastbenutzer wird erstellt, ohne sich zu registrieren
  const guestUser = { username: 'Gast_' + new Date().getTime() }; // Beispiel für einen Gastbenutzernamen

  // JWT für den Gast erstellen (keine Datenbank erforderlich)
  const token = jwt.sign({ userId: guestUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Erfolgreiche Antwort mit Token
  res.status(200).json({ message: 'Gastzugang gewährt', token });
});

// Route zum Überprüfen des Status eines Benutzers (z.B. aktiv oder deaktiviert)
router.put('/update-status', authMiddleware, async (req, res) => {
  const { status } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ msg: 'Benutzer nicht gefunden' });
    }

    // Status aktualisieren (z.B. aktiv/deaktiviert)
    user.status = status || 'active'; // Standardwert 'active'
    await user.save();

    res.json({ msg: 'Benutzerstatus erfolgreich aktualisiert', status: user.status });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Serverfehler');
  }
});

// Logout-Route (Token zurücksetzen)
router.post('/logout', (req, res) => {
  res.json({ msg: 'Logout erfolgreich' });
});

module.exports = router;