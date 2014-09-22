'use strict'
var controller = require('../controllers/auth');

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedinStrategy = require('passport-linkedin').Strategy;

module.exports = function(passport) {

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, callback) {
        callback(null, user.userId);
    });

    // Deserialize the login / user object based on a pre-serialized token
    // which is the user id / email
    passport.deserializeUser(function(id, callback) {
        controller.getAccount(id, function(e, user) {
            callback(null, user);
        });

    });

    // Use local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        }, function(username, password, callback) {
            controller.authenticate(username, password, function(e, user) {
                if (e) {
                    return callback(null, false, e);
                }    
                
                return callback(e, user);            
            }); 
        })
    );


    if(siteConfig.google && siteConfig.google.clientID) {
        // Use google strategy
        passport.use(new GoogleStrategy({
                clientID: siteConfig.google.clientID,
                clientSecret: siteConfig.google.clientSecret,
                callbackURL: siteConfig.website.baseUrl + '/auth/google/callback',       
            },
            function(accessToken, refreshToken, profile, callback) {
                var userinfo = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'google',
                    providerId: profile.id
                };

                controller.providerLogin(userinfo, callback);
            }
        ));
    }

    if(siteConfig.twitter && siteConfig.twitter.clientID) {
        // Use twitter strategy
        passport.use(new TwitterStrategy({
                consumerKey: siteConfig.twitter.clientID,
                consumerSecret: siteConfig.twitter.clientSecret,
                callbackURL: siteConfig.website.baseUrl + '/auth/twitter/callback',
            },
            function(token, tokenSecret, profile, callback) {
                var userinfo = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'twitter',
                    providerId: profile.id
                };

                controller.providerLogin(userinfo, callback);
            }
        ));
    }

    if(siteConfig.facebook && siteConfig.facebook.clientID) {
        // Use facebook strategy
        passport.use(new FacebookStrategy({
                clientID: siteConfig.facebook.clientID,
                clientSecret: siteConfig.facebook.clientSecret,
                callbackURL: siteConfig.website.baseUrl + '/auth/facebook/callback',
            },
            function(accessToken, refreshToken, profile, callback) {
                var userinfo = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'facebook',
                    providerId: profile.id
                };

                controller.providerLogin(userinfo, callback);
            }
        ));
    }

    if(siteConfig.github && siteConfig.github.clientID) {
        // Use github strategy
        passport.use(new GitHubStrategy({
                clientID: siteConfig.github.clientID,
                clientSecret: siteConfig.github.clientSecret,
                callbackURL: siteConfig.website.baseUrl + '/auth/github/callback',    
            },
            function(accessToken, refreshToken, profile, callback) {
                var userinfo = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'github',
                    providerId: profile.id
                };

                controller.providerLogin(userinfo, callback);
            }
        ));
    }

    if(siteConfig.linkedin && siteConfig.linkedin.clientID != "" && siteConfig.linkedin.clientSecret) {
        // use linkedin strategy
        passport.use(new LinkedinStrategy({
                consumerKey: siteConfig.linkedin.clientID,
                consumerSecret: siteConfig.linkedin.clientSecret,
                callbackURL: siteConfig.website.baseUrl + '/auth/linkedin/callback',     
                profileFields: ['id', 'first-name', 'last-name', 'email-address']
            },
            function(accessToken, refreshToken, profile, callback) {
                var userinfo = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'linkedin',
                    providerId: profile.id
                };

                controller.providerLogin(userinfo, callback);
            }
        ));
    }
}