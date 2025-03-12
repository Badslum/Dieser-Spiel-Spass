const jwt = require('jsonwebtoken');

// Middleware für Authentifizierung
module.exports = function (req, res, next) {
  // Token aus den Headern lesen
  const token = req.header('x-auth-token');

  // Wenn kein Token vorhanden ist, zurückweisen
  if (!token) {
    return res.status(401).json({ msg: 'Kein Token, Authentifizierung verweigert' });
  }

  try {
    // Token verifizieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Benutzer-ID aus dem Token hinzufügen
    next();  // Weiter zur nächsten Middleware oder Route
  } catch (err) {
    res.status(401).json({ msg: 'Token ist nicht gültig' });
  }
};