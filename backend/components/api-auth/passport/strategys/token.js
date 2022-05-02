const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const config = require('../../../../config/index')
const User = require('../../../models/Users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader("x-access-token");
opts.secretOrKey = config.secretToken;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

