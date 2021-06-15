const router = require('express').Router();
let Usage = require('../models/usage.model');

router.route('/').get((req, res) => {
Usage.find()
    .then(getUsage => res.json(getUsage))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const udid = req.body.udid;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newUsage = new Usage({
    udid,
    duration,
    date,
  });

  newUsage.save()
  .then(() => res.json('Usage added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;