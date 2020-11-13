const { Router } = require('express');
const { Gig } = require('../database/models');

const gigController = Router();

gigController.get('/', async (req, res) => {
  try {
    const gigEntries = await Gig.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (gigEntries) {
      res.status(200).json({
        gigs: gigEntries,
      });
    } else {
      res.status(404).json({
        message: 'No gigs found for user',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed retrieve gigs for user'
    });
  }
});

gigController.post('/new', async (req, res) => {
  try {
    const { name, date } = req.body;
    const ownerId = req.user.id;

    if (name) {
      let newGig = await Gig.create({
        name,
        date,
        userId: ownerId,
      });
      res.status(200).json({
        message: 'Gig created',
        entry: newGig,
      });
    } else {
      res.status(422).json({
        message: 'Request missing required information',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed to add gig'
    });
  }
});

module.exports = gigController;