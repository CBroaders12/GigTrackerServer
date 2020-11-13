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
  let { title, artist, style, instrument, duration } = req.body;
  let ownerId = req.user.id;
  try {
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

module.exports = musicController;