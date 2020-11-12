const User = require('./User');
const Music = require('./Music');
const Gig = require('./Gig');
const Set = require('./Set');

// Setup Associations
//* 1:n association between User and Music 
User.hasMany(Music, {
  onDelete: "CASCADE",
});
Music.belongsTo(User);

//* 1:n association between User and Gig
User.hasMany(Gig, {
  onDelete: "CASCADE",
});
Gig.belongsTo(User);

//* m:n relationship between Music and Gig through Set
Music.belongsToMany(Gig, { through: Set });
Gig.belongsToMany(Music, { through: Set });

module.exports = {
  User,
  Music,
  Gig,
  Set,
}