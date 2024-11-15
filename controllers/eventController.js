// controllers/eventController.js
const { Event, User } = require('../models');

// Crear un evento
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, color, userId } = req.body;  // userId para asociar el evento con el usuario
    if (!userId) {
      return res.status(400).json({ error: 'El userId es obligatorio' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const event = await Event.create({ title, description, date, time, color, userId });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento', details: error.message });
  }
};

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos', details: error.message });
  }
};

// Obtener eventos de un usuario específico
exports.getUserEvents = async (req, res) => {
  const userId = req.params.userId;  // ID del usuario desde los parámetros de la solicitud
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Event,
        as: 'events',  // Relación definida en el modelo
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json(user.events);  // Devuelve los eventos del usuario
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los eventos', error: error.message });
  }
};

// Actualizar un evento
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, color } = req.body;
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    await event.update({ title, description, date, time, color });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el evento', details: error.message });
  }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    await event.destroy();
    res.status(204).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento', details: error.message });
  }
};
