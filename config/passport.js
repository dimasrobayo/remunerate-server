const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require('./keys');
const User = require('../models/User');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = key.secretOrKey;

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

        try {
            let user = await User.findById(jwt_payload.id)
            return user ? done(null, user) : done(null, false);
            
        } catch (error) {
            console.log('Un error a ocurrido passport')
            return done(error, false);
        }
        
    }))
}