const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');  // Auth-Middleware importieren
const router = express.Router();

// Registrierung
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Überprüfen, ob der Benutzername bereits existiert
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Benutzername bereits vergeben' });
    }

    // Passwort verschlüsseln
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Neuen Benutzer erstellen
    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
    } catch (err) {
        res.status(500).json({ message: 'Fehler bei der Registrierung', error: err });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Benutzer suchen
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Passwort überprüfen
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Falsches Passwort' });
    }

    // JWT erstellen
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Erfolgreich eingeloggt', token });
});

// Gastzugang
router.get('/guest', (req, res) => {
    // Kein Login oder Authentifizierung nötig für Gast
    res.status(200).json({ message: 'Gastzugang erfolgreich' });
});

// Route, um den Status des Benutzers zu ändern (z.B. aktiv oder deaktiviert)
router.put('/update-status', authMiddleware, async (req, res) => {
    const { status } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'Benutzer nicht gefunden' });
        }

        // Status aktualisieren (z.B. aktiv/deaktiviert)
        user.status = status || 'active'; // Default auf 'active'
        await user.save();

        res.json({ msg: 'Benutzerstatus erfolgreich aktualisiert', status: user.status });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverfehler');
    }
});

// Logout-Route (Token zurücksetzen)
router.post('/logout', (req, res) => {
    // Hier könnte man die Logout-Logik implementieren, z.B. Token auf der Client-Seite ungültig machen
    res.json({ msg: 'Logout erfolgreich' });
});

module.exports = router;