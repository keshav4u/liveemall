const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
       
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}
module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback)
}
module.exports.getUserByEmail = function (email, callback) {
    const query = { email: email }
    User.findOne(query, callback)
}
module.exports.getUserByPhone = function (phone, callback) {
    const query = { phone: phone }
    User.findOne(query, callback)
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}