const bcrypt = require('bcryptjs');
const { Router } = require('express');
const { User } = require('../database/models');

const adminController = Router();

adminController.get('/users', async (req, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).json({
      users: userList,
    });
  } catch {
    res.status(500).json({
      message: 'Failed to interact with users'
    });
  }
});

adminController.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    let toDelete = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (toDelete) {
      toDelete.destroy();
      res.status(200).json({
        message: 'User deleted successfully',
      });
    } else {
      res.status(404).json({
        message: 'Failed to locate user'
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed to interact with users'
    });
  }
})

adminController.put('/add/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    let promotedUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (promotedUser.userType !== 'admin') {
      promotedUser.userType = 'admin';
      promotedUser.save();
    } else {
      res.status(409).json({
        message: 'user is already admin'
      });
    }
    
    res.status(200).json({
    message: `User ${userId} successfully made admin`,
    user: promotedUser
    })
  } catch (e) {
    res.status(500).json({
      message: 'Failed to interact with users',
    });
  }
});

adminController.put('/updatepassword/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    let toUpdate = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (toUpdate && password) {
      toUpdate.password = await bcrypt.hash(password, 10);
      toUpdate.save();
      res.status(200).json({
        message: `User ${userId}'s password successfully changed`
      })
    } else if (!password) {
      res.status(422).json({
        message: 'New password not provided',
      });
    } else {
      res.status(404).json({
        message: 'Failed to locate user',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed to interact with users' ,
    });
  }
});

module.exports = adminController;