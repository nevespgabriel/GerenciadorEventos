module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registrations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      idEvent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events', // Refere-se à tabela Events
          key: 'id'
        }
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Refere-se à tabela Users
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'confirmed', 'canceled'],
        defaultValue: 'pending',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Registrations');
  }
};
