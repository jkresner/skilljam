
var jammers = require('./api/jammers');
var skills = require('./api/skills');

var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

});

// URL's
app.get('/skills', skills.findAll);
app.get('/jammers', jammers.findAll);
app.get('/jammers/:id', jammers.findById);
app.get('/jammers-search/:skill', jammers.search);
app.post('/jammers', jammers.create);
app.put('/jammers/:id', jammers.update);
app.delete('/jammers', jammers.deleteAll);

var passport = require('passport');
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

// Set the port
var port = process.env.PORT || 3000;

// Start listening
app.listen(port);

console.log('Listening on port '+ port);
