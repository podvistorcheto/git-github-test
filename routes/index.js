const { response } = require('express');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story')

// get dashboard
router.get('/', function(request, response){
    response.render('index')
})

// get index page
router.get('/dashboard', async function(request, response){
    try {
        const stories = await Story.find({})
        response.status(200).json({ stories });
    } catch (error) {
        console.log(error);
    }
    
})


module.exports = router;