'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic_times extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topic_times.belongsTo(models.topics, {
        as: 'topics',
        foreignKey: 'id_topic'
      });
      topic_times.belongsTo(models.topic_links, {
        as: 'topic_links',
        foreignKey: 'id_link'
      });
    }
  };
  topic_times.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    }
  }, {
    sequelize,
    modelName: 'topic_times',
  });
  return topic_times;
};