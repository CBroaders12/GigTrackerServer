const { DataTypes } = require('sequelize');
const db = require('../../db');

const Set = db.define('set', {
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
{
  timestamps: false,
});

module.exports = Set;