var router = require('express').Router();

var controller = require('../controllers/auth');

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedinStrategy = require('passport-linkedin').Strategy;


//setup passport
module.exports = function(passport) {
    
    //helpers
    var authCallback = function(req, res) {
        res.redirect('/');
    };

    var session = function(req, res) {
        res.redirect('/');
    };
    
    var signin = function(req, res, next) {
        passport.authenticate('local',  function(err, user, info) {
            if (err || !user) { 
                return res.send(500, info);
            }

            req.login(user, function(err) {
                if (err) { 
                    return next(err); 
                }

                return res.json(200, user);
            });
        })(req, res, next);
    };

    // routes
    router.post('/register', function(req, res, next) { 
        var data = req.body || {};

        controller.register(data, function(e, user) {
            if (e || !user) {
                return res.send(500, e);
            }

            req.login(user, function(err) {
                if (err) { 
                    return next(err); 
                }

                return res.json(200, user);
            });
        });
    });

    router.get('/remove', function(req, res, next) {
        if(req.user.UserId != req.body.id) {
            return res.send(JSON.stringify({status: 'error', message: e}));
        }

        controller.remove(req.body.id, function(e) {
            if(!e) {
                return res.send('success');
            }

            next(e);
        });
    });

    router.post('/signout', function(req, res, next){
        req.logout();
        res.json(200, {});
    });

    router.post('/signin', signin);

    // Setting the facebook oauth routes
    router.get('/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), signin);

    router.get('/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), authCallback);

    // Setting the github oauth routes
    router.get('/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), signin);

    router.get('/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), authCallback);

    // Setting the twitter oauth routes
    router.get('/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), signin);

    router.get('/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), authCallback);

    // Setting the google oauth routes
    router.get('/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), signin);

    router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), authCallback);

    // Setting the linkedin oauth routes
    router.get('/linkedin', passport.authenticate('linkedin', {
        failureRedirect: '/signin',
        scope: [ 'r_emailaddress' ]
    }), signin);

    router.get('/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/siginin'
    }), authCallback);

    return router;
}

//module.exports = router;