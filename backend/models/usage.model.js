const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usageSchema = new Schema({
  udid: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 5
  },
  video_length: { type: Number, required: true },
  usage: { type: Number, required: true },
  percentage_usage: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Usage = mongoose.model('Usage', usageSchema);

module.exports = Usage;