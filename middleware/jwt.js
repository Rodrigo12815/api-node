const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Guardar los datos del usuario en req
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authenticateToken;
