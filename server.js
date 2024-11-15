require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rutas de autenticación
app.use('/auth', authRoutes);
app.use('/api', eventRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
