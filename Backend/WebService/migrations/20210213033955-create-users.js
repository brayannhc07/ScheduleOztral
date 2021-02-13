'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(45),
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
    await queryInterface.dropTable('users');
  }
};