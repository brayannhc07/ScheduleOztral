'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topic_links', {
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
          model: 'topics',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      url: {
        type: DataTypes.STRING(100),
        allowNull: true
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
    await queryInterface.dropTable('topic_links');
  }
};