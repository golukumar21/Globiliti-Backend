const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        userName: req.body.userName,
        email: req.body.email,
    });
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'User registered successfully'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/login', (req, res, next) => {
    User.findOne({ 'email': req.body.email, 'password': req.body.password }, (err, user) => {
        if (!user) {
            return res.status(500).json({ isAuth: false, message: ' Auth failed ,User not found' })
        } else {
            res.status(201).json({ message: "Login Successfull." });
        };
    });
})

module.exports = router;