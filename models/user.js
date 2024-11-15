// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Definir explicitamente la clave primaria
      autoIncrement: true, // Auto incrementable
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,  // Usa la instancia de sequelize
    modelName: 'User',
  }
);

// Relaciones
// Ya está definida en `Event.js`, no hace falta repetirla aquí

module.exports = User;
