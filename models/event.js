// models/Event.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');  // Asegúrate de importar el modelo User correctamente

class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#000000',
    },
  },
  {
    sequelize,  // Usa la instancia de sequelize
    modelName: 'Event',
  }
);

// Definir la relación entre User y Event
// Asegúrate de que User esté importado correctamente
User.hasMany(Event, { as: 'events', foreignKey: 'userId' });  // Un usuario tiene muchos eventos
Event.belongsTo(User, { foreignKey: 'userId' });  // Un evento pertenece a un usuario

module.exports = Event;
