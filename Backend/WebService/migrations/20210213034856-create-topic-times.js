'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topic_times', {
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
      id_link: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'topic_links',
          key: 'id'
        }
      },
      day: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      start: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end: {
        type: DataTypes.TIME,
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
    await queryInterface.dropTable('topic_times');
  }
};