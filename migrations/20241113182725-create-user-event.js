// migrations/20241113163358-create-user-event.js
'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserEvent', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Relaciona con la tabla Users
          key: 'id', // Relaciona con la columna id de Users
        },
        onDelete: 'CASCADE', // Elimina los registros de UserEvent si el usuario es eliminado
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Events', // Relaciona con la tabla Events
          key: 'id', // Relaciona con la columna id de Events
        },
        onDelete: 'CASCADE', // Elimina los registros de UserEvent si el evento es eliminado
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserEvent');
  },
};
