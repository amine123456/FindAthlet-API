const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

//set up express app
const app = express();


//connect to mongodb
mongoose.connect('mongodb://localhost/athlet');
mongoose.Promise = global.Promise ;

//express static for front end
app.use(express.static('public'));


//set up body parser
app.use(bodyParser.json());


//init routes
app.use('/api' , routes);

//eroor handling
app.use(function(err, req, res , next){
   console.log(err);
   res.status(422).send({ errors: err.message });
  
});

//listen for requests
app.listen(process.env.port || 4000 , function(){
        console.log('listenin on port 4000');
})