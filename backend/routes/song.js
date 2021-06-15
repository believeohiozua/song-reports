const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/').get((req, res) => {
    Song.find()
    .then(getSongs => res.json(getSongs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const song = req.body.song;
  const artist = req.body.artist;
  const description = req.body.description;

  const newSong = new Song({
    song,
    artist,
    description,
  });

  newSong.save()
  .then(() => res.json('Song added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Song.findById(req.params.id)
      .then(getSongs => res.json(getSongs))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Song.findByIdAndDelete(req.params.id)
      .then(() => res.json('Song deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Song.findById(req.params.id)
      .then(getSongs => {
        getSongs.song = req.body.song;
        getSongs.artist = req.body.artist;
        getSongs.description = req.body.description;
  
        getSongs.save()
          .then(() => res.json('Song updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
