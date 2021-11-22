const { response } = require('express');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story')

// get dashboard
router.get('/', function(request, response){
    response.render('home')
})

// get index page
router.get('/dashboard', async function(request, response){
    try {
        const stories = await Story.find({}).lean();
        response.render('dashboard', {
        title: request.title,
        stories
    })
    } catch (error) {
        console.log(error);
    }
    
})


module.exports = router;