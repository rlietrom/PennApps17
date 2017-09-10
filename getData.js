var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI);


var models = require('./models');
var Stats = models.Stats
var Playlist = models.Playlist

var data;

Playlist.find({})
  .exec(function(err, docs) {
    console.log(docs)
    //write code here!!
  })
