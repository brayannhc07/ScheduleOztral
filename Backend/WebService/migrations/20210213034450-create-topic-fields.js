'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topic_fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_topic: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'topic_fields',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      value: {
        type: DataTypes.STRING(120),
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
    await queryInterface.dropTable('topic_fields');
  }
};