// routes/calendar.js
const express = require('express');
const { Event } = require('../models');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticateUser, async (req, res) => {
  const events = await Event.findAll({ where: { userId: req.user.userId } });
  res.json(events);
});

router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, description, date, time, color } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      time,
      color,
      userId: req.user.userId,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento' });
  }
});

router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id, userId: req.user.userId } });
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

    const { title, description, date, time, color } = req.body;
    event.update({ title, description, date, time, color });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
});

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id, userId: req.user.userId } });
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

    await event.destroy();
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});

module.exports = router;
