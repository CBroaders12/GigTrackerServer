const { DataTypes } = require('sequelize');
const db = require('../../db');

const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
  },
});

module.exports = User;