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
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'topics',
          key: 'id'
        }
      },
      id_link: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'topic_links',
          key: 'id'
        }
      },
      day: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      start: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end: {
        type: Sequelize.TIME,
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