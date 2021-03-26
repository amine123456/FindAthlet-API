const express = require('express');
const Athlet = require('../modules/athlets');

//set up router
const router = express.Router();


router.get("/login" , function(req , res ){

        res.send("bonjour ici");
})

//get routes for listing from mongodb
router.get("/athelet" , function(req , res , next){
    
    /**
     Athlet.find({}).then(function(athlets){
            res.send(athlets);
    })
     */
    
    

    //url params
    
    Athlet.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
           },
           maxDistance: 100000,
           spherical: true,
           distanceField: "dis"
    }).then(function(athlets){
        res.send(athlets);
    }).catch(next);
    
})

//post request for adding in the mongodb
router.post("/athelet" , function(req , res , next){
    Athlet.create(req.body).then(function(athlet){
        res.send({athlet});
    }).catch(next);
    
})


//put request for updating in the db
router.put("/athelet/:id" , function(req , res , next){
    Athlet.findByIdAndUpdate({_id: req.params.id} , req.body, {new: true}).then(function(athlet){
            res.send(athlet);
    })
    

})

//delete request for deleting from the database 
router.delete("/athelet/:id" , function(req , res , next){
    console.log(req.params.id);
    Athlet.findByIdAndRemove({_id: req.params.id}).then(function(athlet){
            res.send(athlet);
    })
    
})

module.exports = router ;