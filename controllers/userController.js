// controllers/userController.js
const { User, Event } = require('../models');

// Obtener los eventos de un usuario por ID
const getUserEvents = async (req, res) => {
  const userId = req.params.userId; // ID del usuario desde los parámetros de la solicitud
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Event,
        as: 'events',  // Asegúrate de que el alias en la relación esté bien
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json(user.events); // Devuelve los eventos del usuario
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los eventos', error: error.message });
  }
};

module.exports = { getUserEvents };
