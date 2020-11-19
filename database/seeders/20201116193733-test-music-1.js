'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('music', [
      {
        title: 'Auf dem Wasser zu singen',
        artist: 'Franz Schubert',
        style: 'Classical',
        instrument: 'Voice',
        duration: '3:22',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'Nebbie',
        artist: 'Ottorino Respighi',
        style: 'Classical',
        instrument: 'Voice',
        duration: '3:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'You Raise Me Up',
        artist: 'Josh Groban',
        style: 'Pop',
        instrument: 'Voice',
        duration: '4:52',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('music', { userId: 2 })
  }
};
