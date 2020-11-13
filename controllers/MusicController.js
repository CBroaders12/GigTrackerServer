const { Router } = require('express');
const { Music } = require('../database/models');

const musicController = Router();

musicController.get('/', async (req, res) => {
  try {
    const musicEntries = await Music.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (musicEntries) {
      res.status(200).json({
        results: musicEntries,
      });
    } else {
      res.status(404).json({
        message: 'No music found for user',
      });
    }
  } catch (e) {
    res.status(500).message({
      message: 'Failed to retrieve music for user',
    });
  }
});

musicController.post('/new', async (req, res) => {
  try {
    const { title, artist, style, instrument, duration } = req.body;
    const ownerId = req.user.id;
    if (title) {
      let newMusic = await Music.create({
        title,
        artist,
        style,
        instrument,
        duration,
        userId: ownerId,
      });
      res.status(200).json({
        message: 'Music entry created',
        entry: newMusic,
      })
    } else {
      res.status(422).json({
        message: 'Missing required information'
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Failed to add music'
    });
  }
});

musicController.route('/:id')
  .put(async (req, res) => {
    try {
      const { title, artist, style, instrument, duration } = req.body;
      const toUpdate = await Music.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (toUpdate) {
        Object.assign(toUpdate, {title, artist, style, instrument, duration});
        toUpdate.save();
        res.status(200).json({
          message: 'Item updated successfully',
          updated: toUpdate,
        });
      } else {
        res.status(404).json({
          message: 'Item not found or item does not belong to user'
        });
      }
    } catch (e) {
      res.status(500).json({
        message: 'Failed to interact with music items'
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const toDelete = await Music.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (toDelete) {
        toDelete.destroy()
        res.status(200).json({
          message: 'Item deleted successfully'
        });
      } else {
        res.status(404).json({
          message: 'Item not found or item does not belong to user',
        });
      }
    } catch (e) {
      res.status(500).json({
        message: 'Failed to interact with music items'
      });
    }
  });

module.exports = musicController;