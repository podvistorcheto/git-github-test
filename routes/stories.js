const { response } = require('express');
const express = require('express');
const router = express.Router();
const Story = require('../models/Story')

// get home page
router.get('/add', function(request, response){
    response.render('stories/add')
})

// save stories page
router.post('/', async function(request, response){
    try {
      await Story.create()
      response.redirect('dashboard')
    } catch (error) {
      console.error(error)
      response.render('errors/500')
    }
  })


module.exports = router;