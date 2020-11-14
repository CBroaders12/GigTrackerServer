const { Router } = require('express');
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

    console.log(addedMusic, targetGig);
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



module.exports = setController;