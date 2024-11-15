// middlewares/auth.js
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token no válido' });
    req.user = user;
    next();
  });
}
router.get('/user', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // `req.user.id` es el ID del usuario desde el token
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

module.exports = { authenticateUser };
