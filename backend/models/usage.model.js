const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usageSchema = new Schema({
  udid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  usage: { type: Number, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Usage = mongoose.model('Usage', usageSchema);

module.exports = Usage;