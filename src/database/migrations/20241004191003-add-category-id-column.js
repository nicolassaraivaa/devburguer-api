'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // O método 'up' é executado quando a migration é aplicada
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER, // Define a coluna 'category_id' como um número inteiro
      references: {
        model: 'categories', // Refere-se à tabela 'categories'
        key: 'id', // A coluna 'id' da tabela 'categories' será a chave estrangeira
      },
      onUpdate: 'CASCADE', // Se o id da categoria for atualizado, reflete automaticamente nas referências
      onDelete: 'SET NULL', // Se a categoria for deletada, o valor do 'category_id' será definido como NULL
      allowNull: true, // A coluna pode ser nula (não é obrigatória)
    });
  },

  // O método 'down' é executado para reverter a migration
  async down(queryInterface) {
    await queryInterface.removeColumn('products', 'category_id'); // Remove a coluna 'category_id' da tabela 'products'
  },
};
