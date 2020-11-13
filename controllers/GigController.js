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

gigController.route('/:id')
  .put(async (req, res) => {
    try {
      const { name, date } = req.body;
      const toUpdate = await Gig.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (toUpdate) {
        Object.assign(toUpdate, {name, date});
        toUpdate.save();
        res.status(200).json({
          message: 'Gig updated successfully',
          updated: toUpdate,
        });
      } else {
        res.status(404).json({
          message: 'Gig not found or gig does not belong to user'
        });
      }
    } catch (e) {
      res.status(500).json({
        message: 'Failed to interact with gigs'
      })
    }
  })
  .delete(async (req, res) => {
    try {
      const toDelete = await Gig.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (toDelete) {
        toDelete.destroy();
        res.status(200).json({
          message: 'Gig deleted successfully'
        })
      } else {
        res.status(404).json({
          message: 'Gig not found or gig does not belong to user'
        });
      }
    } catch (e) {
      res.status(500).json({
        message: 'Failed to interact with gigs'
      })
    }
  })

module.exports = gigController;