
var jammers = require('./api/jammers');
var skills = require('./api/skills');

// Set the port
var port = process.env.PORT || 3000;
var ip = process.env.IP || 'http://localhost';
var url_base=ip + ':' + port;


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

var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: url_base +"/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

// application needs extended permissions
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'read_stream' })
);

// Start listening
app.listen(port);

console.log('Listening on port '+ port);
