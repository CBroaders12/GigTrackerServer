'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('music', [
      {
        title: 'Boy With a Coin',
        artist: 'Iron and Wine',
        style: 'Indie',
        instrument: 'Guitar',
        duration: '4:06',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: 'Leaving on a Jet Plane',
        artist: 'John Denver',
        style: 'Folk',
        instrument: 'Guitar',
        duration: '3:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: 'I Will Wait',
        artist: 'Mumford & Sons',
        style: 'Indie',
        instrument: 'Guitar',
        duration: '4:36',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('music', { userId: 3 }, {})
  }
};
