// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log('Datos recibidos:', req.body); // Verifica que se reciban correctamente

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });

    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error(error);  // Imprime el error completo
    res.status(500).json({ error: 'No se pudo crear el usuario', details: error.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Datos recibidos:', { username, password });

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en el servidor', error);
    res.status(500).json({ error: 'Error en el servidor', details: error.message });
  }
};
