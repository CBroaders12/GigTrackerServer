const { Router } = require('express');
const { Gig, Music, Set } = require('../database/models');

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

gigController.route('/:gig_id')
  .get(async (req, res) => {
    try {
      const gigId = req.params.gig_id;
      const userId = req.user.id;

      let targetGig = await Gig.findOne({
        where: {
          id: gigId,
          userId,
        },
        include: [
          {
            model: Music,
            through: {attributes: ['notes']}
          }
        ]
      });
      if (targetGig) {
        res.status(200).json({targetGig});
      } else {
        res.status(404).json({
          message: 'Gig does not exist or does not belong to user'
        });
      }
    } catch (e) {
      res.status(500).json({
        message: 'Failed to interact with database'
      });
    }
  })
  .put(async (req, res) => {
    try {
      const { name, date } = req.body;
      const toUpdate = await Gig.findOne({
        where: {
          id: req.params.gig_id,
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
          id: req.params.gig_id,
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
  });

gigController.delete('/:gig_id/:music_id', async (req, res) => {
  try {
    const gigId = req.params.gig_id;
    const musicId  = req.params.music_id;
    const userId = req.user.id;

    let targetGig = await Gig.findOne({
      where: {
        id: gigId,
        userId,
      },
    });
    if (targetGig) {
      let toDelete = await Set.findOne({
        where: {
          gigId,
          musicId,
        },
      });
      if (toDelete) {
        toDelete.destroy();
        res.status(200).json({
          message: 'Music successfully removed from gig',
        });
      } else {
        res.status(404).json({
          message: 'Music not found in gig'
        });
      }
    } else {
      res.status(404).json({
        message: 'Gig does not exist or does not belong to user',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed to interact with database',
    });
  }
});

gigController.post('/:gig_id/add', async (req, res) => {
  try {
    const { musicId, notes } = req.body;
    const userId = req.user.id;
    const gigId = req.params.gig_id;

    let addedMusic = await Music.findOne({
      where: {
        id: musicId,
        userId,
      },
    });
    let targetGig = await Gig.findOne({
      where: {
        id: gigId,
        userId,
      },
    });

    if (addedMusic && targetGig) {
      let newEntry = await Set.create({
        musicId,
        gigId,
        notes,
      });
      res.status(200).json({
        message: 'Song successfully added to gig',
        newEntry
      });
    } else if (!addedMusic) {
      res.status(404).json({
        message: 'Music not found in user\'s library',
      });
    } else if (!targetGig) {
      res.status(404).json({
        message: 'Gig not found in user\'s schedule',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed to interact with database'
    });
  }
});

module.exports = gigController;