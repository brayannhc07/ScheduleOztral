'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      teacher: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ''
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ''
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ''
      },
      color: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: ''
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
    await queryInterface.dropTable('topics');
  }
};