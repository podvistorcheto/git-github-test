const { response } = require('express');
const express = require('express');
const router = express.Router();

// get dashboard
router.get('/', function(request, response){
    response.render('dashboard')
})

// get index page
router.get('/home', function(request, response){
    response.render('home')
})


module.exports = router;