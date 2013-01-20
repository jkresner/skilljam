var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/skilljam_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to 'skilljam_db' database");
});


var jammerSchema = mongoose.Schema({
    name: String,
    picture: String,
    email: String,
    skills: Array,
    description: String
})

var Jammer = mongoose.model('Jammer', jammerSchema)



exports.create = function(req, res) {
  var jammer = new Jammer(
        {
            name: req.body.name,
            picture: req.body.picture,
            email: req.body.email,
            skills: req.body.skills,
            description: req.body.description
        });

  console.log(jammer);
  jammer.save(function(err, result){
    exports.findAll(req, res);
  });
};

exports.findById = function(req, res) {
  var id = req.params.id;
  Jammer.find({  _id: id }, function(err, items){
    res.send(items);
  });
};

exports.findAll = function(req, res) {

  Jammer.find(function(err, items){
    console.log('findAll.find()', err, items);
    res.send(items);
  });
};

