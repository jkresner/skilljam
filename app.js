var jammers = require('./api/jammers');
var skills = require('./api/skills');

var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

});

app.get('/skills', skills.findAll);

app.get('/jammers', jammers.findAll);
app.get('/jammers/:id', jammers.findById);
app.post('/jammers', jammers.create);



app.listen(3000);



console.log('Listening on port 3000');




