const { DataTypes } = require('sequelize');
const db = require('../../db');

const Gig = db.define('gig', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Gig;