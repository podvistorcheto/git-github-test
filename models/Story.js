const mongoose = require('mongoose');
const { stringify } = require('uuid');

const StorySchema = new mongoose.Schema({
    title: {
      type: String,
      require: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
});

  module.exports = mongoose.model('Story', StorySchema);