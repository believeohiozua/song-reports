const router = require('express').Router();
let Usage = require('../models/usage.model');
const Song = require('../models/song.model')

router.route('/').get((req, res) => {
  Usage.find()
    .then(getUsage => res.json(getUsage))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find').get(async (req, res) => {
try{
const song = await Song.find();
res.status(200).send(song);
}
catch(err){
res.status(400).send(err);
}
})

router.route('/add').post((req, res) => {
 
  const udid = req.body.udid;
  const usage = Number(req.body.duration);
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const { id } = req.body;

  const newUsage = new Usage({
    udid,
    usage,
    duration,
    date,
  });
  Song.findByIdAndUpdate(id, { $push: { report: newUsage } },
    { new: true }).exec()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  newUsage.save()
    .then(() => res.json('Usage added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
