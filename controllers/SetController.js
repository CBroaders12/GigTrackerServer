const { Router } = require('express');
const { restart } = require('nodemon');
const { Set, Music, Gig } = require('../database/models');

const setController = Router();

setController.post('/addsong', async (req, res) => {
  try {
    const { musicId, gigId, notes } = req.body;
    const userId = req.user.id;

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

setController.get('/:gig_id', async (req, res) => {
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

setController.delete('/:gig_id/:music_id', async (req, res) => {
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


module.exports = setController;