'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic_fields extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topic_fields.belongsTo(models.topics, {
        as: 'topics',
        foreignKey: 'id_topic'
      });
    }
  };
  topic_fields.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
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
    }
  }, {
    sequelize,
    modelName: 'topic_fields',
  });
  return topic_fields;
};