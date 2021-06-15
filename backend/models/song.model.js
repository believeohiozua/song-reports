const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  song: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String, required: true },  
  report: [
    { type: Schema.Types.ObjectId, 
      required: false,
      ref: 'Usage'
     }
  ],
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;