'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};