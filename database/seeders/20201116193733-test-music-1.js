'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('music', [
      {
        title: 'Suite in G Major',
        artist: 'J. S. Bach',
        style: 'Classical',
        instrument: 'Cello',
        duration: '3:15',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
      },
      {
        title: 'Doubt',
        artist: 'Mikhail Glinka',
        style: 'Classical',
        instrument: 'Cello',
        duration: '4:15',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
      },
      {
        title: 'Sonata in B Minor for solo cello, op. 8, mvt. III',
        artist: 'Zoltan Kodaly',
        style: 'Classical',
        instrument: 'Cello',
        duration: '9:07',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('music', { userId: 2 }, {})
  }
};
