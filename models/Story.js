const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
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
}, { timestamps: true });

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;