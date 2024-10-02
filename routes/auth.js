const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {executeQuery} = require("../database/db");
const { response } = require('../app');

const router = express.Router();

// Supongamos que esta es la base de datos de usuarios (en un entorno real, esto sería una base de datos)
const users = [
  { id: 1, username: 'Admin', password: '$2a$10$R9HpAIERNfUvJXBqkf0niurRtwcj/LxsSRzrb/CFHFnQMbqpF0g.y' } // Contraseña encriptada con bcrypt
];

// Clave secreta para firmar el JWT
const JWT_SECRET =  process.env.JWT_SECRET;

// Ruta para iniciar sesión y generar un token
router.post('/login', async (req, res) => {
 
  const { username, password } = req.body;

  // Buscar usuario por nombre de usuario
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }
  // Generar un token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Devolver el token
  res.json({ 
    success : true,
    msj     : "Exito en la peticion",
    token 
    });
});

module.exports = router;
