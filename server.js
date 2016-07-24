var express = require("express");
var validUrl = require('valid-url');
var shortid = require('shortid');
var mongoose = require('mongoose');

var mongoUri = 'mongodb://localhost/app-dev'; //process.env.MONGOLAB_URI || 
var app = express();
var port = process.env.PORT;

var urlList = require('./schema.js');

mongoose.connect(mongoUri);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  }
);

app.listen(port, function(){
  console.log("Listening on port: " + port);
});

app.get('/:id', function(req, res) {
  var id = parseInt(req.params.id,10);
  if(Number.isNaN(id)) {
    res.status(404).send("Invalid Short URL");
  } else {
    urlList.find({id: id}, function (err, docs) {
      if (err) {
        res.status(404).send(err);
      }
      
      if (docs && docs.length) {
        res.redirect(docs[0].url);
      } else {
        res.status(404).send("Invalid Short URL");
      }
    });
  }
});
