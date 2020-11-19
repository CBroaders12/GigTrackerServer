const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const validateJWTMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  } else if (req.headers.authorization) {
    const { authorization } = req.headers;

    const payload = jwt.verify(authorization, process.env.JWT_SECRET);

    if (payload) {
      User.findOne({
        where: {
          id: payload.id
        }
      })
      .then(user => {
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        message: 'Not allowed'
      });
    }
  } else {
    res.status(401).json({
      message: 'Not allowed'
    });
  }
}

module.exports = validateJWTMiddleware;