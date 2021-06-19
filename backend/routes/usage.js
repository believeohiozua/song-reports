const router = require('express').Router();
let Usage = require('../models/usage.model');
const Song = require('../models/song.model')
var ObjectId = require('mongodb').ObjectID;

router.route('/').get((req, res) => {
  Usage.find()
    .then(getUsage => res.json(getUsage))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find').get(async (req, res) => {
  try {
    const song = await Song.find();
    res.status(200).send(song);
  }
  catch (err) {
    res.status(400).send(err);
  }
})

// POST
router.route('/add').post((req, res) => {

  const udid = req.body.udid;
  const video_length = Number(req.body.video_length);
  const usage = Number(req.body.usage);
  const percentage_usage = Number(req.body.percentage_usage);
  const date = Date.now();
  const song_id = req.body.song_id;

  const newUsage = new Usage({
    udid,
    video_length,
    usage,
    percentage_usage,
    date
  });
  newUsage.save()
    .then(() => res.json('Usage added!'),
      Song.findByIdAndUpdate(song_id, {
        $push: {
          report: {
            'udid': udid,
            'video_length': video_length,
            'usage': usage,
            'percentage_usage': percentage_usage,
            'date': date,
            'usage_id': newUsage._id
          }
        }
      },
        { new: true }).exec()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    )
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/delete/:id').post((req, res) => {
  const song_id = req.body.song_id;
  const report_id = req.body.report_id;

  Song.findByIdAndUpdate(song_id, {
    $pull: { report: { _id: new ObjectId(report_id) } }
  }, { new: false }).exec()
    .then((res) => console.log(res),
      Usage.findByIdAndDelete(req.params.id)
      // .then(() => res.json('usage deleted.'),
      //   res.send('done')
      // )
      // .catch(err => res.status(400).json('Error: ' + err))
    )
    .catch((err) => console.log(err)
    );


});

module.exports = router;
