const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DEV_DATABASE_URL);

module.exports = db;