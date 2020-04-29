const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


// @route   GET api/auth
// @desc    Return single user
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        if(!user) {
            return res.status(404).json({ msg: "No user found!"});
        }
        res.status(200).send(user);
    } catch {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// @route   POST api/auth
// @desc    Authenticate user & return token
// @access Public 
router.post('/', [
    check('email')
        .isEmail().withMessage('Email not valid'),
    check('password')
        .notEmpty().withMessage('Password can not be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User not found!' }] });
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ errors: [{ msg: 'Incorrect password!' }] });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwt_secret'), { expiresIn: 3600 }, (err, token) => {
            res.status(200).json({token});
        });
    } catch(err) {
        res.status(500).json({errors: [{ msg: err.message }]});
    }
    
})

module.exports = router;