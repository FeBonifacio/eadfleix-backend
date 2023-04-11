// Essa tela é o primeiro banco de dados para criar/excluir as categorias

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    //criação da tabela
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  // Desfaz o de cima
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories')
  }
};
