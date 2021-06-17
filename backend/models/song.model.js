const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  song: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  email: { type: String, required: true },
  report: [
    {
      udid: String,
      video_length: Number,
      usage: Number,
      percentage_usage: Number,
      date: Date
    }
  ],
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;