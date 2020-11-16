'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
      email: 'singertest@email.com',
      password: bcrypt.hashSync(process.env.TEST_PASS, 10),
      userType: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'singertest@email.com' }, {});
  },
};
