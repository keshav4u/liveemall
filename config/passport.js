const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/frontend/user');
const AdminUser = require('../models/admin/user');
const config = require('../config/database')

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.getUserById(jwt_payload._id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        AdminUser.getUserById(jwt_payload._id, (err, AdminUser)=>{
            if(err){
                return done(err, false);
            }
            if(AdminUser){
                return done(null, AdminUser);
            }
            else{
                return done(null, false);
            }
        });
    }));
}