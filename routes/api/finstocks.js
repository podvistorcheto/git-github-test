const express = require("express");
const router = express.Router();
const finstocks = require('../../Finstocks');
const uuid = require('uuid');
const res = require("express/lib/response");



// get all stocks entries
router.get('/', function(request, response){
    response.json(finstocks);
  });
  
// GET a single finstock entry
router.get('/:id', function(request, response){
    const finstockFound = finstocks.some(finstock => finstock.id === parseInt(request.params.id))
      if(finstockFound) {
        response.json(finstocks.filter(finstock => finstock.id === parseInt(request.params.id)));
      }
      else {
      response.status(400).json({ message: `No member with the id of ${request.params.id}`});
      }
  });

// Create finstock
router.post('/', function(request, response){
    const newFinStock = {
        id: uuid.v4(),
        name: request.body.name,
        price: request.body.price,
        // returnOI: request.body.returnOI
    }
    if(!newFinStock.name || !newFinStock.price) {
        return response.status(400).json({ message: 'Please include stock and price'})
    }
    finstocks.push(newFinStock);
    response.json(finstocks);
    // response.redirect('/')
})

// Update finstock
router.patch('/:id', function(request, response){
      if(finstockFound) {
        const finstockUpdate = request.body;
        finstocks.forEach(finstock => {
            if(finstock.id === parseInt(request.params.id)){
                finstock.name = finstockUpdate.name ? finstockUpdate.name : finstock.name;
                finstock.email = finstockUpdate.email ? finstockUpdate.name : finstock.email;
                response.json({ message: 'finStock updated', finstock })
            }
        });
      }
      else {
      response.status(400).json({ message: `No member with the id of ${request.params.id}`});
    }
});

// Delete finstock
router.delete('/:id', function(request, response){
    const finstockFound = finstocks.some(finstock => finstock.id === parseInt(request.params.id))
      if(finstockFound) {
        response.json({ message: 'Finstock Deleted', finstocks: finstocks.filter(finstock => finstock.id !== parseInt(request.params.id))});
      }
      else {
      response.status(400).json({ message: `No member with the id of ${request.params.id}`});
    }
});


module.exports = router;