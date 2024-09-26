/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id:{
        primaryKey: true, // Define que a coluna 'id' será a chave primária
        allowNull: false, // Não permite valores nulos
        type: Sequelize.UUID, // Define o tipo da coluna como UUID
        defaultValue: Sequelize.UUIDV4 // Gera automaticamente um UUID para novos registros
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true // Garante que cada valor na coluna seja único
      }, 
      password_hash:{
        type: Sequelize.STRING,
        allowNull: false
      },
      admin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Define o valor padrão da coluna como 'false'
      },
      created_at:{
        type: Sequelize.DATE, // valores de data e hora
        allowNull:false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false
      }
    });
  },

  async down (queryInterface) {
  await queryInterface.dropTable('users');
    
  }
};
