'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'admin@email.com',
      password: bcrypt.hashSync(process.env.ADMIN_SEEDER_PASS, 10),
      userType: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@email.com' }, {});
  }
};
