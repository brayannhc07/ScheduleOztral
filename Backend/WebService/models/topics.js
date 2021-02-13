'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topics.belongsTo(models.users, {
        as: 'users',
        foreignKey: 'id_user'
      });
    }
  };
  topics.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
      defaultValue: '#fff'
    }
  }, {
    sequelize,
    modelName: 'topics',
  });
  return topics;
};