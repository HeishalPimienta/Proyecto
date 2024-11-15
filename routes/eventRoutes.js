// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Rutas de eventos
router.post('/events', eventController.createEvent);         // Crear evento
router.get('/events', eventController.getAllEvents);         // Obtener todos los eventos
router.put('/events/:id', eventController.updateEvent);      // Actualizar evento
router.delete('/events/:id', eventController.deleteEvent);   // Eliminar evento

module.exports = router;
