'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // O método 'up' é executado para aplicar a mudança, neste caso, remover a coluna 'category'
  async up (queryInterface) {
    await queryInterface.removeColumn('products', 'category'); // Remove a coluna 'category' da tabela 'products'
  },

  // O método 'down' é executado para reverter a mudança, neste caso, adicionar a coluna 'category' novamente
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING, // Define o tipo da coluna como STRING
      allowNull: false, // A coluna 'category' não pode ser nula
    });
  }
};
