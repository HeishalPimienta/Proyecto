// migrations/20241113120001-create-event.js
'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      userId: { // Este campo representa la relación con el modelo User
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Asegúrate de que la tabla Users exista
          key: 'id',  // Hace referencia a la columna 'id' en Users
        },
        onDelete: 'CASCADE',  // Si el usuario se elimina, también se eliminarán sus eventos
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Events');
  },
};
