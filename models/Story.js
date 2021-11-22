const mongoose = require('mongoose');
// const { stringify } = require('uuid');

const StorySchema = new mongoose.Schema({
    title: {
      type: String,
      required:[true, 'must provide a name'],
      trim: true,
      maxlength: [50, 'name limit is 20 characters'],
    },
    body: {
      type: String,
      required:[true, 'must provide a text'],
      trim: true,
      maxlength: [350, 'name limit is 350 characters'],
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
});

module.exports = mongoose.model('Story', StorySchema);