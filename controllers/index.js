const userController = require('./UserController');
const musicController = require('./MusicController');
const gigController = require('./GigController');

module.exports = {
  User: userController,
  Music: musicController,
  Gig: gigController,
}