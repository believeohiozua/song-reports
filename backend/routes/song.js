const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/').get((req, res) => {
  Song.find()
    .then(getSongs => res.json(getSongs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const song = req.body.song;
  const title = req.body.title;
  const artist = req.body.artist;
  const description = req.body.description;
  const photo = req.body.photo;
  const email = req.body.email;

  const newSong = new Song({
    song,
    title,
    artist,
    description,
    photo,
    email
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
      getSongs.title = req.body.title;
      getSongs.artist = req.body.artist;
      getSongs.description = req.body.description;
      getSongs.photo = req.body.photo;
      getSongs.email = req.body.email;
      getSongs.save()
        .then(() => res.json('Song updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


exports.addReport = function (req, res, next) {
  var dataReport = {
    "udid": req.body.udid,
    "usage": req.body.usage,
    "duration": req.body.duration,
    "date": req.body.date
  };
  Song.findOneAndUpdate({ _id: req.body.id }, { $push: { report: dataReport } });
};