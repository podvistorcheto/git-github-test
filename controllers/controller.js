const Story = require('../models/story');
const asyncWrapper = require('../middleware/async')


const getAllStories = asyncWrapper(async function (request, response) {
    const stories = await Story.find({stories})
    response.status(200).json({ stories });
    console.log(stories);
})

const createNewStory = asyncWrapper(async function (request, response) {
    const saveNewStory = await Story.create(request.body)
    response.status(201).json({ saveNewStory });
})

const getStory = asyncWrapper(async function (request, response) {
    const {id:storyID} = request.params;
    const story = await Story.findOne({_id:storyID});
    if (!story){
        return response.status(404).json({ msg: `No story with id: ${storyID}`})
    }
    console.log(story)
    response.status(200).json({ story });
})

module.exports = {
    getAllStories, createNewStory, getStory
}