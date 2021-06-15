const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  udid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  duration: { type: Number, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;