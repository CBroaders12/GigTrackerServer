const { DataTypes } = require('sequelize');
const db = require('../../db');

const Music = db.define('music', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  style: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instrument: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});

module.exports = Music;