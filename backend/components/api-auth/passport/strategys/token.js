const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const config = require('../../../../config/index')
const User = require('../../../models/Users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader("x-access-token");
opts.secretOrKey = config.secretToken;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload)
      
}));

