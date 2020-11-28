const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../database/models');
const { UniqueConstraintError } = require('sequelize/lib/errors')

const userController = Router();

userController.post('/register', async (req, res) => {
  let { email, password } = req.body;

  try {
    await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      userType: 'user',
    });
    let thisUser = await User.findOne({
      where: {
        email
      }
    });
    const token = jwt.sign({id: thisUser.id}, process.env.JWT_SECRET);
    res.status(201).json({
      message: 'User registered',
      token,
    });
  } catch (e) {
    if (e instanceof UniqueConstraintError) {
      res.status(409).json({
        message: 'Email already in use'
      });
    } else {
      res.status(500).json({
        message: 'Failed to register user'
      });
    }
  }
});

userController.post('/login', async (req, res) => {
  let { email, password } = req.body;
  try {
    let loginUser = await User.findOne({
      where: {
        email
      }
    });
    if (loginUser && await bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET);
      console.log(token);
      res.status(200).json({
        message: 'Login successful',
        token,
        userType: loginUser.userType,
      });
    } else {
      res.status(401).json({
        message: 'Login failed: Email or password incorrect'
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error logging in'
    });
  }
});

module.exports = userController;