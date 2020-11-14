const userController = require('./UserController');
const musicController = require('./MusicController');
const gigController = require('./GigController');
const setController = require('./SetController');
const adminController = require('./AdminController');

module.exports = {
  User: userController,
  Music: musicController,
  Gig: gigController,
  Admin: adminController,
  Set: setController,
}