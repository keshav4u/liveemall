const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const AdminUser = require('../../models/admin/user');

//Register
router.post('/register', (req, res, next) => {
    console.log(req);
    let newUser = new AdminUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        company: req.body.company,
        country: req.body.country,
        phone: req.body.phone,
        password: req.body.password
    });
    
    AdminUser.addUser(newUser, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: 'faild to register user'
            });
        }
        else {
            res.json({
                success: true,
                msg: 'User Register'
            });
        }
    });

});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    if (req.body.email) {
        const email = req.body.email;
        const password = req.body.password;
        AdminUser.getUserByEmail(email, (err, user) => {
            if (err) return err;
            if (!user) {
                return res.json({
                    success: false,
                    msg: "User Email Not Found"
                });
            }
            AdminUser.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800
                    });
                    res.json({
                        success: true,
                        token: 'bearer ' + token,
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            company: user.company,
                            country: user.country,
                            phoneNo: user.phoneNo
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        msg: "Wrong password"
                    });
                }
            });
        });
    }
    if (req.body.phone) {
        const phone = req.body.phone;
        const password = req.body.password;
        AdminUser.getUserByPhone(phone, (err, user) => {
            if (err) return err;
            if (!user) {
                return res.json({
                    success: false,
                    msg: "User Mobile Not Found"
                });
            }
            AdminUser.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800
                    });
                    res.json({
                        success: true,
                        token: 'bearer ' + token,
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            company: user.company,
                            country: user.country,
                            phoneNo: user.phoneNo
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        msg: "Wrong password"
                    });
                }
            });
        });
    }
    

});

//check username
router.post('/checkUsername', (req, res, next) => {

    const username = req.body.username;

    AdminUser.getUserByUsername(username, (err, user) => {
        if (err) return err;
        if (user) {
            return res.json({
                success: false,
                msg: "Username is already registered."
            });
        }
        else {
            return res.json({
                success: true,
                msg: "No match found"
            });
        }
    });
});
//check phone number 
router.post('/checkPhone', (req, res, next) => {
    const phone = req.body.phone;

    AdminUser.getUserByPhone(phone, (err, user) => {
        if (err) return err;
        if (user) {
            return res.json({
                success: false,
                msg: "Phone Number is already registered."
            });
        }
        else {
            return res.json({
                success: true,
                msg: "No match found"
            });
        }
    });
});
//check mail
router.post('/checkEmail', (req, res, next) => {
    const email = req.body.email;

    AdminUser.getUserByEmail(email, (err, user) => {
        if (err) return err;
        if (user) {
            return res.json({
                success: false,
                msg: "Email ID is already registered."
            });
        }
        else {
            return res.json({
                success: true,
                msg: "No match found"
            });
        }
    });
});
//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json();
});

module.exports = router;