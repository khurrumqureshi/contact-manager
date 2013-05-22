
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/api'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    config = require('./config'),
    db = require('./lib/db-config');

process.on('uncaughtException', function (err) {
    console.log("Node NOT Exiting...");
    console.log(err.stack);
});

db.connectDatabase(function(conn) {
    //Passport Configurations

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                db.users.findOne({email:username,password:password},function(err,user){
                    if (err || user==null) { return done(err); }

                    return done(null, user);
                })
            });
        }
    ));

    passport.use(new TwitterStrategy(config.twitterApp,
        function(token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                var user = {access_token:token,profile:profile, token_secret: tokenSecret}
                return done(null, user);
            });
        }
    ));

    passport.use(new FacebookStrategy(config.facebookApp,
        function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                var user = {access_token:accessToken,profile:profile,refresh_token:refreshToken};
                return done(null, user);
            });
        }
    ));

    passport.use(new LinkedInStrategy(config.linkedInApp,
        function(token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                var user = {access_token:token, profile:profile, token_secret: tokenSecret}
                return done(null, user);
            });
        }
    ));

    var app = module.exports = express();

// Express Configuration

    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'secret' }));
        app.use(express.bodyParser());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.static(__dirname + '/public'));
        app.use(app.router);
    });

    app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
        app.use(express.errorHandler());
    });

    routes.route(app, passport);

// Start server

    app.listen(config.main.port, function(){
        console.log("Listening on " + config.main.port);
    });

})
