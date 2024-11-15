'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('Events');
    if (!columns.hasOwnProperty('userId')) {
      await queryInterface.addColumn('Events', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Referencia la tabla Users
          key: 'id',       // Hace referencia a la columna id en Users
        },
        onDelete: 'CASCADE',  // Elimina los eventos si el usuario es eliminado
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Events', 'userId');
  },
};
