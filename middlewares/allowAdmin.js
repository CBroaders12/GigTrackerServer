const allowAdminMiddleware = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next();
  } else {
    res.status(401).json({
      message: 'Not allowed: admin only'
    });
  }
}

module.exports = allowAdminMiddleware;