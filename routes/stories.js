const { response } = require('express');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story')

// get home page
router.get('/add', function(request, response){
    response.render('stories/add')
})

// get index page


module.exports = router;